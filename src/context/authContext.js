/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../config/firebase";
import {
    doc,
    updateDoc,
    getDoc,
    setDoc,
    onSnapshot,
    deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";
import TypeStorage from "../components/notifications/typeStorage/typeStorage";
import useMobile from "../functions/useMobile";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const isMobile = useMobile();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [storageInfo, setStorageInfo] = useState(Cookies.get("typeStorage"));
    const [allTaskDone, setAllTaskDone] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        checkList: [],
        date: "",
    });
    const [simpleList, setSimpleList] = useState({
        title: "",
        description: [],
        simple: true,
    });

    useEffect(() => {
        if (storageInfo === "local") {
            let localTask = localStorage.getItem("todo");
            let localTaskDone = localStorage.getItem("done");

            if (JSON.parse(localTask)) {
                if (JSON.parse(localTask).length > 0)
                    setAllTask(JSON.parse(localTask));
            }

            if (JSON.parse(localTaskDone)) {
                if (JSON.parse(localTaskDone).length > 0)
                    setAllTaskDone(JSON.parse(localTaskDone));
            }
        }
    }, []);

    useEffect(() => {
        if (user && user.uid !== undefined && storageInfo === "cloud")
            updateDBTasks();
        else {
            localStorage.setItem("todo", JSON.stringify(allTask));
            localStorage.setItem("done", JSON.stringify(allTaskDone));
        }
    }, [allTask.length, allTaskDone.length]);

    useEffect(() => {
        setCurrentPage(window.location.pathname);
        auth.onAuthStateChanged((user) => {
            user && storageInfo === "cloud" && getDBTasks(user);
            setUser(user);
            !user && navigate("/login");
        });
        if (
            currentPage !== "/" &&
            currentPage !== "/pomodoro" &&
            currentPage !== "/login"
        ) {
            navigate("/");
        }
        if (user) {
            !storageInfo &&
                TypeStorage(isMobile, turnCloudToLocal, turnLocalToCloud);
        }
        if (user && user.uid && storageInfo === "cloud") realTimeUpdate();
    }, [user, navigate]);

    /*FIREBASE SPACE*/
    const getDBTasks = async (user) => {
        const docRef = doc(db, `usersTasks/${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setAllTask(docSnap.data().allTasks);
            setAllTaskDone(docSnap.data().allTasksDone);
        } else {
            await setDoc(docRef, {
                allTasks: allTask,
                allTasksDone: allTaskDone,
            });
        }
    };

    const updateDBTasks = async () => {
        const userDbCredentials = doc(db, `usersTasks/${user.uid}`);
        await updateDoc(userDbCredentials, {
            allTasks: allTask,
            allTasksDone: allTaskDone,
        });
    };

    const realTimeUpdate = async () => {
        const docRef = doc(db, `usersTasks/${user.uid}`);
        onSnapshot(docRef, (doc) => {
            setAllTask(doc.data().allTasks);
            setAllTaskDone(doc.data().allTasksDone);
        });
    };

    const turnCloudToLocal = async () => {
        setStorageInfo("local");
        Cookies.set("typeStorage", "local", { expires: 400 });
        localStorage.setItem("todo", JSON.stringify(allTask));
        localStorage.setItem("done", JSON.stringify(allTaskDone));
        const docRef = doc(db, `usersTasks/${user.uid}`);
        const docSnap = await getDoc(docRef);
        docSnap.exists() && (await deleteDoc(docRef));
    };

    const turnLocalToCloud = async () => {
        setStorageInfo("cloud");
        Cookies.set("typeStorage", "cloud", { expires: 400 });
        getDBTasks(user);
        localStorage.clear();
    };
    /*FIREBASE SPACE*/

    const setIsDone = (id) => {
        if (id === -1) return;
        const doneTask = allTask[id];
        doneTask.date = moment()._d;
        setAllTaskDone((arr) => [...arr, doneTask]);
        allTask.splice(id, 1);
    };

    const value = {
        user,
        allTaskDone,
        setAllTaskDone,
        allTask,
        setAllTask,
        task,
        setTask,
        simpleList,
        setSimpleList,
        setIsDone,
        updateDBTasks,
        storageInfo,
        setStorageInfo,
        turnCloudToLocal,
        turnLocalToCloud,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

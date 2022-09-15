/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "config/firebase";
import {
    doc,
    updateDoc,
    getDoc,
    setDoc,
    onSnapshot
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CurrentDate } from "functions/timePassed";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
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
        if (user && user.uid !== undefined) {
            updateDBTasks();
        }
    }, [allTask.length, allTaskDone.length]);

    useEffect(() => {
        setCurrentPage(window.location.pathname);
        auth.onAuthStateChanged((user) => {
            !user && navigate("/login");
            user && getDBTasks(user);
            setUser(user);
        });
        if (
            currentPage !== "/" &&
            currentPage !== "/pomodoro" &&
            currentPage !== "/login"
        ) {
            navigate("/");
        }
        if (user && user.uid) realTimeUpdate();
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
                userEmail: user.email,
                allTasks: allTask,
                allTasksDone: allTaskDone,
            });
        }
    };

    const updateDBTasks = async () => {
        const userDbCredentials = doc(db, `usersTasks/${user.uid}`);
        try {
            await updateDoc(userDbCredentials, {
                userEmail: user.email,
                allTasks: allTask,
                allTasksDone: allTaskDone,
            });
        } catch (error) {
            console.log(error)
        }
    };

    const realTimeUpdate = async () => {
        const docRef = doc(db, `usersTasks/${user.uid}`);
        onSnapshot(docRef, (doc) => {
            setAllTask(doc.data().allTasks);
            setAllTaskDone(doc.data().allTasksDone);
        });
    };
    /*FIREBASE SPACE*/

    const setIsDone = (id) => {
        if (id === -1) return;

        const endTime = CurrentDate()
        allTask[id].date = endTime;
        setAllTaskDone((arr) => [...arr, allTask[id]]);
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
        updateDBTasks
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

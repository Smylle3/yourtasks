/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "config/firebase";
import {
    doc,
    updateDoc,
    getDoc,
    setDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CurrentDate } from "functions/timePassed";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [typeSort, setTypeSort] = useState(Cookies.get("sort"));
    const [allTaskDone, setAllTaskDone] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        checkList: [],
        date: "",
        endDate: "",
        priority: 1
    });
    useEffect(() => {
        if (user && user.uid !== undefined) {
            updateDBTasks();
        }
    }, [allTask.length, allTaskDone.length]);

    const setDate = (a, b) => {
        a = new Date(a.date.split(" ")[0])
        b = new Date(b.date.split(" ")[0])
        return a - b
    }

    useEffect(() => {
        const TaskSorted = allTask
        if (typeSort === undefined) {
            Cookies.set("sort", "priority", { expires: 360 })
            setTypeSort("priority")
        }
        else {
            switch (typeSort) {
                case "priority":
                    TaskSorted.sort((a, b) => b.priority - a.priority)
                    break;
                case "name":
                    TaskSorted.sort((a, b) => a.title.localeCompare(b.title))
                    break;
                case "endDate":
                    TaskSorted.sort(setDate)
                    break;
                default:
                    break;
            }
        }
        setChange(!change)
    }, [allTask, typeSort]);

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
    }, [user]);

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
            console.error(error)
        }
    };

    /*FIREBASE SPACE*/
    const setIsDone = (id) => {
        if (id === -1) return;

        const endTime = CurrentDate()
        allTask[id].endDate = endTime;
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
        setIsDone,
        updateDBTasks,
        change,
        setChange,
        typeSort,
        setTypeSort
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

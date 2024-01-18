import React, { useEffect, useState } from "react";
import "../App.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
} from "firebase/firestore";

export default function HomePage() {
    // const handleLogout = () => {
    //     document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    //     window.location.reload();
    // };
    const cookie = document.cookie.split(";") || ["", ""];
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [allExpense, setAllExpense] = useState([]);
    const [content, setContent] = useState([]);
    const [amt, setAmt] = useState(0);
    const [cnt, setCnt] = useState("");

    const getTransactions = async () => {
        console.log("runnig transaction");
        const alltransactions = await getDocs(collection(db, "transactions"));
        alltransactions.forEach((element) => {
            if (element.data().id.trim() == document.cookie.slice(6).trim()) {
                // console.log(element.data().transaction);
                setAllExpense(element.data().transaction);
                setContent(element.data().content);
                // console.log(allExpense);
                // for (let i = 0; i < element.data().transaction.length; i++) {
                //     console.log(
                //         element.data().transaction[i] +
                //             " " +
                //             element.data().content[i]
                //     );
                //     let key = element.data().content[i];
                //     setAllExpense((prev) => ({
                //         ...prev,
                //         key: element.data().transaction[1],
                //     }));
                // }
            }
        });
    };

    const amtHandler = (e) => {
        setAmt(e.target.value);
    };
    const cntHandler = (e) => {
        setCnt(e.target.value);
    };

    const updateTransaction = async (e) => {
        let factor = e.target.innerHTML == "Credit" ? 1 : -1;
        setAllExpense((prev) => [...prev, factor * amt]);
        setContent((prev) => [...prev, cnt]);
        await setDoc(doc(db, "transactions", "USG9T8F30OokqvJDfnQR"), {
            id: "218e7114-546e-4ad8-a11b-e0916392a428",
            transaction: [...allExpense, factor * amt],
            content: [...content, cnt],
        });
        alert("Added");
    };

    useEffect(() => {
        console.log(cookie);
        setIsAuthenticated(cookie != "" ? true : false);
        cookie != "" ? getTransactions() : null;
    }, []);

    const firebaseConfig = {
        apiKey: "AIzaSyD_grnszlOXBbJi9xZ-j-BLyyDUsmEfeEA",
        authDomain: "budget-buddy-fcd2c.firebaseapp.com",
        projectId: "budget-buddy-fcd2c",
        storageBucket: "budget-buddy-fcd2c.appspot.com",
        messagingSenderId: "551730940396",
        appId: "1:551730940396:web:98bf51d04698d9960b58c9",
        measurementId: "G-2VCQER5N7K",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return (
        <div className="bg-[url('/homepage.png')] bg-top h-[100vh] w-full">
            <NavBar token={isAuthenticated} />
            {isAuthenticated && (
                <div className="flex justify-between m-auto items-center mt-10 w-[85%]">
                    <div className="bg-slate-400 w-[50%] h-[70vh]">
                        <ul>
                            {allExpense.map((element, id) => (
                                <li key={id}>
                                    {element +
                                        ":" +
                                        content[allExpense.indexOf(element)]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[50%]">
                        <div className="flex flex-col w-[70%]">
                            <input
                                type="text"
                                className="outline outline-1 outline-gray-300 px-4 py-3 mt-4 rounded-lg shadow-lg"
                                placeholder="Enter the Amount (in Rs.)"
                                value={amt}
                                onChange={amtHandler}
                            />
                            <input
                                type="text"
                                className="outline outline-1 outline-gray-300 px-4 py-3 mt-4 rounded-lg shadow-lg"
                                placeholder="Enter the Description for Amount"
                                value={cnt}
                                onChange={cntHandler}
                            />
                        </div>
                        <button
                            className="px-8 py-2 my-4 bg-slate-500"
                            onClick={updateTransaction}
                        >
                            Credit
                        </button>
                        <button
                            className="px-8 py-2 my-4 bg-slate-500"
                            onClick={updateTransaction}
                        >
                            Debit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

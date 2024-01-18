import React, { useEffect, useState } from "react";
import "../App.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DotLoader } from "react-spinners";
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
    const cookie = document.cookie.split(";") || ["", ""];
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [allExpense, setAllExpense] = useState([]);
    const [content, setContent] = useState([]);
    const [amt, setAmt] = useState(0);
    const [cnt, setCnt] = useState("");
    const [balance, setBalance] = useState(0);
    let sum = 0;

    const [isSaving, setIsSaving] = useState(false);

    const show = (message) => {
        toast.success(message);
    };

    const getTransactions = async () => {
        const alltransactions = await getDocs(collection(db, "transactions"));
        alltransactions.forEach((element) => {
            if (element.data().id.trim() == document.cookie.slice(6).trim()) {
                setAllExpense(element.data().transaction);
                setContent(element.data().content);
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
        setIsSaving(true);
        let factor = e.target.innerHTML == "Credit" ? 1 : -1;
        setAllExpense((prev) => [...prev, factor * amt]);
        setContent((prev) => [...prev, cnt]);
        await setDoc(
            doc(db, "transactions", `${document.cookie.slice(6).trim()}`),
            {
                id: `${document.cookie.slice(6).trim()}`,
                transaction: [...allExpense, factor * amt],
                content: [...content, cnt],
            }
        );
        show("Transaction Added Successfully");
        setIsSaving(false);
        setAmt(0);
        setCnt("");
    };

    useEffect(() => {
        setIsAuthenticated(cookie != "" ? true : false);
        cookie != "" ? getTransactions() : null;
    }, []);

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_KEY,
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
        <div
            id="home"
            className="bg-[url('/homepage.png')] bg-top h-[100vh] w-full"
        >
            <ToastContainer />
            {isSaving && (
                <div className="absolute flex justify-center items-center t-0 l-0 bg-gray-300 h-[100vh] w-full bg-opacity-60">
                    <DotLoader size={100} color="#004BFF" />
                </div>
            )}
            <NavBar token={isAuthenticated} />
            {isAuthenticated == false ? (
                <div className="flex justify-between items-center w-[85%] m-auto mt-[100px] max-[880px]:flex-col">
                    <img
                        className="w-[47%]  max-[880px]:w-full"
                        src="/welcome.jpg"
                        alt=""
                    />
                    <p className="w-[50%] text-justify  max-[660px]:text-xs max-[880px]:w-[80%]  max-[880px]:mt-10">
                        Welcome to{" "}
                        <span className="text-blue-500 font-bold">
                            Budget Buddy
                        </span>
                        , your go-to platform for effortless expense tracking
                        and financial empowerment. With Budget Buddy, you can
                        effortlessly monitor your expenditures, gain insightful
                        analytics to visualize spending patterns, set and
                        achieve financial goals, and simplify budgeting. Our
                        user-friendly interface and powerful tools make it easy
                        to take control of your finances, helping you navigate
                        the path toward financial freedom. Join Budget Buddy
                        today and start your journey to financial wellness.
                    </p>
                </div>
            ) : (
                <div className="flex justify-between m-auto items-center mt-10 w-[85%] max-[700px]:flex-col max-[700px]:mt-[100px]">
                    <div className="w-[50%] max-[700px]:w-full">
                        <div className="rounded-md overflow-y-scroll bg-gradient-to-r p-5 from-[#00ffd982] to-[#004cffdc] h-[60vh]  ">
                            <ul className="max-[480px]:text-xs">
                                {allExpense.map((element, id) =>
                                    element > 0 ? (
                                        <li
                                            className="text-green-500 max-[480px]:text-xs my-8 text-right font-bold text-lg"
                                            key={id}
                                        >
                                            <h3>{"+ Rs." + element}</h3>
                                            <h2 className="text-black">
                                                {
                                                    content[
                                                        allExpense.indexOf(
                                                            element
                                                        )
                                                    ]
                                                }
                                            </h2>
                                        </li>
                                    ) : (
                                        <li
                                            className="text-red-700 max-[480px]:text-xs my-8 font-bold text-lg"
                                            key={id}
                                        >
                                            <h3>{"- Rs." + -1 * element}</h3>
                                            <h2 className="text-black">
                                                {
                                                    content[
                                                        allExpense.indexOf(
                                                            element
                                                        )
                                                    ]
                                                }
                                            </h2>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h1 className="bg-gray-200 max-[480px]:text-base py-4 px-5 text-center rounded-lg text-xl">
                                Balance : {"Rs."}
                                {allExpense.reduce(
                                    (accumulator, currentValue) =>
                                        accumulator + currentValue,
                                    0
                                )}
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[50%] max-[700px]:w-full max-[700px]: mt-10">
                        <div className="flex flex-col w-[70%]">
                            <input
                                type="number"
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
                        <div className="flex justify-evenly w-[60%] mt-10 flex-wrap">
                            <button
                                className="px-8 py-3 rounded-xl hover:outline hover:outline-1 hover:outline-black my-4 bg-green-500"
                                onClick={updateTransaction}
                            >
                                Credit
                            </button>
                            <button
                                className="px-8 py-3 rounded-xl hover:outline hover:outline-1 hover:outline-black my-4 bg-red-500"
                                onClick={updateTransaction}
                            >
                                Debit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

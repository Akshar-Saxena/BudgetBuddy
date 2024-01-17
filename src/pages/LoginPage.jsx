import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    let flag = 0;

    const [isSaving, setIsSaving] = useState(false);

    const show = (message) => {
        toast.success(message);
    };
    const showError = (message) => {
        toast.error(message);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const loginHandler = (e) => {
        if (flag == 1) {
            show("Login Success");
            document.cookie = "username=" + userData.username;
            navigate("/");
        }
    };

    const handleSubmit = async (e) => {
        if (userData.username == "") {
            showError("Enter a username");
        } else if (userData.password == "") {
            showError("Enter a password");
        } else {
            setIsSaving(true);
            const allusers = await getDocs(collection(db, "users"));
            allusers.forEach((element) => {
                if (
                    element.data().email == userData.email.trim() &&
                    element.data().password == userData.password.trim()
                ) {
                    flag = 1;
                    loginHandler();
                }
            });
            if (flag != 1) {
                showError("Invalid username or password");
            }
            setIsSaving(false);
        }
    };

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
        <div className="flex justify-evenly items-center w-full h-[100vh] bg-[url('/bg.png')] bg-center">
            <ToastContainer />
            {isSaving && (
                <div className="absolute flex justify-center items-center t-0 l-0 bg-gray-300 h-[100vh] w-full bg-opacity-60">
                    <DotLoader size={100} color="#004BFF" />
                </div>
            )}
            <img className="w-[35%]" src="/account.png" alt="" />
            <div className="flex flex-col mt-[130px] ml-[110px] w-[25%] justify-center items-center">
                <input
                    className="shadow-[2px_7px_2px_0px_rgba(0,0,0,0.3)] w-full rounded-lg px-4 py-3 my-2"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleInputChange}
                />
                <input
                    className="shadow-[2px_7px_2px_0px_rgba(0,0,0,0.3)] w-full rounded-lg px-4 py-3 my-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleInputChange}
                />
                <button
                    className="bg-[#20E1C4] hover:shadow-[2px_7px_2px_0px_rgba(0,0,0,0.3)] w-[30%] px-2 py-2 rounded-lg mt-8"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

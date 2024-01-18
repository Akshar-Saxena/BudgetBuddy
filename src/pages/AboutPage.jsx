import React from "react";
import NavBar from "../components/NavBar";
import "../App.css";

export default function AboutPage() {
    const cookie = document.cookie.split(";") || ["", ""];
    return (
        <div
            id="home"
            className="bg-[url('/homepage.png')] bg-top h-[100vh] w-full"
        >
            <NavBar token={cookie != "" ? true : false} />
            <p className="bg-gradient-to-r p-5 rounded-xl shadow-xl shadow-[#00ffd982] from-[#00ffd982] to-[#004cffdc] mt-[100px] w-[70%] m-auto">
                <span className="font-bold text-2xl">
                    Greetings from Akshar Saxena
                </span>
                , a passionate frontend developer and the creative mind behind
                Budget Buddy! As a dedicated developer, I've poured my
                enthusiasm for design and functionality into crafting Budget
                Buddy—a powerful and user-friendly expense tracking website. My
                goal is to empower you on your financial journey, providing a
                seamless experience to help you take control of your expenses
                and achieve your financial goals. Welcome to Budget Buddy, where
                financial wellness meets cutting-edge frontend development!
                Thank you for being a part of this exciting venture, and I hope
                Budget Buddy becomes an invaluable asset on your path to
                financial well-being. Happy budgeting!
            </p>
        </div>
    );
}

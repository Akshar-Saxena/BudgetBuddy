import React from "react";
import NavBar from "../components/NavBar";
import "../App.css";

export default function ServicesPage() {
    const cookie = document.cookie.split(";") || ["", ""];
    return (
        <div id="home" className="bg-[url('/homepage.png')] bg-top  w-full">
            <NavBar token={cookie != "" ? true : false} />
            <p className="bg-gradient-to-r p-5 rounded-xl shadow-xl shadow-[#00ffd982] from-[#00ffd982] to-[#004cffdc] mt-[100px] w-[70%] m-auto mb-10">
                <ul>
                    <li className="font-bold text-lg my-4">
                        Simplified Budgeting
                    </li>
                    <li>
                        Make budgeting a breeze with Budget Buddy. Create and
                        manage budgets effortlessly, ensuring that you stay on
                        track and in control of your finances.
                    </li>

                    <li className="font-bold text-lg my-4">
                        User-Friendly Interface
                    </li>
                    <li>
                        Enjoy a seamless and intuitive platform designed for
                        users of all levels. Budget Buddy prioritizes a positive
                        user experience, making it easy for you to navigate and
                        utilize its features.
                    </li>
                    <li className="font-bold text-lg my-4">
                        Responsive Design
                    </li>
                    <li>
                        Access Budget Buddy anytime, anywhere. The website is
                        optimized for responsiveness across various devices,
                        ensuring a consistent and enjoyable user experience.
                    </li>
                    <li className="font-bold text-lg my-4">
                        Secure Data Management
                    </li>
                    <li>
                        Rest easy knowing that your financial data is secure.
                        Budget Buddy employs robust security measures to protect
                        your information, ensuring a safe and confidential
                        environment.
                    </li>
                </ul>
            </p>
        </div>
    );
}

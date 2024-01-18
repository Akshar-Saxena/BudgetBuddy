import React, { useEffect, useState } from "react";
import "../App.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    // const handleLogout = () => {
    //     document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    //     window.location.reload();
    // };
    const cookie = document.cookie.split(";") || ["", ""];

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        console.log(cookie);
        setIsAuthenticated(cookie != "" ? true : false);
    }, []);
    return (
        <div className="bg-[url('/homepage.png')] bg-top h-[100vh] w-full">
            <NavBar token={isAuthenticated} />
        </div>
    );
}

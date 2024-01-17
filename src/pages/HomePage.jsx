import React from "react";
import "../App.css";
import NavBar from "../components/NavBar";

export default function HomePage() {
    return (
        <div className="bg-[url('/homepage.png')] bg-top h-[100vh] w-full">
            <NavBar />
        </div>
    );
}

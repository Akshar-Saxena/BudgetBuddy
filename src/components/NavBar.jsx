import React, { useState } from "react";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

export default function NavBar(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const navigate = useNavigate();
    const logoutHandler = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.reload();
    };
    return (
        <div className="w-[90%] m-auto flex justify-between items-center">
            <div className="flex items-center max-[575px]:justify-between max-[575px]:w-full">
                <img
                    className="w-[120px] cursor-pointer max-[500px]:mt-3"
                    src="logo.png"
                    onClick={() => navigate("/")}
                    alt=""
                />
                <ul className="flex max-[575px]:hidden">
                    <Link to="/about">
                        <li className="font-semibold mx-6">About</li>
                    </Link>
                    <Link to="/services">
                        <li className="font-semibold mx-6">Services</li>
                    </Link>
                </ul>
                <button
                    className="hamburger-icon block text-4xl min-[575px]:hidden"
                    onClick={toggleMenu}
                >
                    ☰
                </button>
                {isMenuOpen && (
                    <div className="menu-items min-[575px]:hidden absolute text-center top-[120px] left-0 w-full bg-[#ffffff85] flex flex-col">
                        <a className="py-2" href="/">
                            Home
                        </a>
                        <a className="py-2" href="/about">
                            About
                        </a>
                        <a className="py-2" href="/services">
                            Services
                        </a>
                        {props.token == false ? (
                            <div className="flex flex-col">
                                <a className="py-2" href="/login">
                                    Login
                                </a>
                                <a className="py-2" href="/signup">
                                    Signup
                                </a>
                            </div>
                        ) : (
                            <a className="py-2" onClick={logoutHandler}>
                                Logout
                            </a>
                        )}
                    </div>
                )}
            </div>
            {props.token == false ? (
                <div className="max-[575px]:hidden max-[675px]:ml-[150px]">
                    <button
                        className="w-[110px] rounded-md mx-3 py-2 bg-[#20E1C4] max-[675px]:mt-5"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                    <button
                        className="w-[110px] rounded-md mx-3 py-2 bg-[#004BFF] max-[675px]:mt-5"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </button>
                </div>
            ) : (
                <div className="max-[575px]:hidden">
                    <button
                        className="w-[110px] rounded-md mx-3 py-2 bg-[#20E1C4]"
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

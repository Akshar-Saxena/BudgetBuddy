import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {
    const navigate = useNavigate();
    const logoutHandler = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.reload();
    };
    return (
        <div className="w-[90%] m-auto flex justify-between items-center">
            <div className="flex items-center">
                <img className="w-[120px]" src="logo.png" alt="" />
                <ul className="flex">
                    <li className="font-semibold mx-6">About</li>
                    <li className="font-semibold mx-6">Services</li>
                    <li className="font-semibold mx-6">Transactions</li>
                </ul>
            </div>
            {props.token == false ? (
                <div>
                    <button
                        className="w-[110px] rounded-md mx-3 py-2 bg-[#20E1C4]"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                    <button
                        className="w-[110px] rounded-md mx-3 py-2 bg-[#004BFF]"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </button>
                </div>
            ) : (
                <div>
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

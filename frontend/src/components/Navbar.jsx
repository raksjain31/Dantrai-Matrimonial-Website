import React from "react"
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {

    const { authUser } = useAuthStore();
    return (
        <nav className="sticky top-0 z-50 w-full py-4">
            <div className="flex w-full justify-between mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-2 rounded-2xl">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 cursor-pointer">
                    <img src="/Abugoad.png" className="h-18 w-18 bg-primary/20 text-primary border-none px-2 py-2 rounded-full" />
                    <span className="text-lg md:text-2xl font-bold tracking-tight text-white hidden md:block">
                        Abugoad Youth Connect
                    </span>
                </Link>
                {authUser == null && (
                    <div className="flex items-center gap-x-1">
                        <div className="navbar-end">
                            <a className="btn bg-purple-800 " >Log In</a>
                            <a className="btn  bg-purple-800">Sign in</a>
                        </div>

                    </div>
                )}

                {/* User Profile and Dropdown */}
                <div className="flex items-center gap-8">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex flex-row ">
                            <div className="w-10 rounded-full ">
                                <img
                                    src={
                                        authUser?.image ||
                                        "https://avatar.iran.liara.run/public/boy"
                                    }
                                    alt="User Avatar"
                                    className="object-cover"
                                />
                            </div>

                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
                        >
                            {/* Admin Option */}


                            {/* Common Options */}
                            <li>
                                <p className="text-base font-semibold">

                                    {authUser?.name}

                                </p>
                                <hr className="border-gray-200/10" />
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/add-profile"
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Add Profile
                                </Link>
                            </li>
                            {authUser?.role === "ADMIN" && (
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="hover:bg-primary hover:text-white text-base font-semibold"
                                    >
                                        <Code className="w-4 h-4 mr-1" />
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                            <li>
                                <LogoutButton className="hover:bg-primary hover:text-white">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </LogoutButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;
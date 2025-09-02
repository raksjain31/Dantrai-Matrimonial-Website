
import React, { useEffect, useState, useRef } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
    Users,
    UserCheck,
    UserPlus,
    Clock,
    CircleUser,
    LogOut,
    UsersRound, CircleCheck, FileSpreadsheet, X, Venus
} from "lucide-react"
import AdminUsersTable from "../components/AdminUsersTable";
import LogoutButton from "../components/LogoutButton";
import { useAuthStore } from '../store/useAuthStore';


const iconMap = {
    "Total Users": <Users className="w-8 h-8 text-primary" />,
    "Total Biodata's": <UserPlus className="w-8 h-8 text-primary" />,
    "Approved Biodata": <UserCheck className="w-8 h-8 text-primary" />,
    "Rejected Biodata": <X className="w-8 h-8  text-red-500" />,
    "Pending Approvals": <Clock className="w-8 h-8 text-primary" />,
    "Female Biodata's": <Venus className="w-8 h-8 text-pink-500" />,
    "Male Biodata's": <CircleUser className="w-8 h-8 text-primary" />,
};


const DashBoardPage = () => {
    const [counts, setCounts] = useState({
        totaluserCount: 0,
        totalProfiles: 0,
        totalApprovedUsers: 0,
        totalApprovalPendingUsers: 0,
        totalMaleProfiles: 0,
        totalFemaleProfiles: 0,
        totalRejectedUsers: 0
    });

    const { authUser } = useAuthStore();
    const { getAllPendingApproval, userApprovedPending,
        isUsersApprovalPendingLoading } = useAdminStore();

    //console.log("approval data:", userApprovedPending);

    useEffect(() => {
        getAllPendingApproval()

    }, [getAllPendingApproval])


    useEffect(() => {
        axiosInstance.get("/admin/get-Allcounts")
            .then(res => setCounts(res.data))
            .catch(err => console.error("Failed to load counts", err));
    }, []);

    const tableRef = useRef(null);
    const handleCardClick = (card) => {

        if (card.title === "Pending Approvals") {
            // // 👇 scroll to table instead of navigating
            // tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            // close drawer in mobile
            const drawerCheckbox = document.getElementById("sidebar-toggle");
            if (drawerCheckbox) drawerCheckbox.checked = false;

            // wait for drawer to close, then scroll
            setTimeout(() => {
                tableRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 300); // matches drawer animation duration
        }
    };

    const cards = [
        { title: "Total Users", value: counts.totaluserCount, link: "/userlist", },
        { title: "Total Biodata's", value: counts.totalProfiles, link: "/total-biodata", },
        { title: "Approved Biodata", value: counts.totalApprovedUsers, link: "/approvedbiodata", },
        { title: "Rejected Biodata", value: counts.totalRejectedUsers, link: "/rejected-profiles" },
        { title: "Pending Approvals", value: counts.totalApprovalPendingUsers, link: null }, // fill from API if available
        { title: "Female Biodata's", value: counts.totalFemaleProfiles, link: "/biodata/FEMALE", },
        { title: "Male Biodata's", value: counts.totalMaleProfiles, link: "/biodata/MALE", },
    ];



    return (
        <div className="drawer lg:drawer-open">
            {/* Sidebar */}
            <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-6">
                <label htmlFor="sidebar-toggle" className="btn btn-primary drawer-button lg:hidden mb-4">
                    Open Menu
                </label>

                {/* Header */}
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                {/* Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {cards.map((card, idx) => (

                        <div key={idx} className="card bg-base-100 shadow-xl border border-white">
                            {card.link ? (
                                <Link
                                    to={card.link}//"/approvedbiodata"
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <div className="card-body">

                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="text-primary">{iconMap[card.title]}</div>
                                            <h2 className="card-title">{card.title}</h2>

                                        </div>

                                        <p className="text-2xl font-semibold">{card.value}</p>
                                    </div>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => handleCardClick(card)}
                                    className="w-full text-left hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <div className="card-body">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="text-primary">{iconMap[card.title]}</div>
                                            <h2 className="card-title">{card.title}</h2>
                                        </div>
                                        <p className="text-2xl font-semibold">{card.value}</p>
                                    </div>
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* User Table */}


                {




                    userApprovedPending.length > 0 ?
                        <div ref={tableRef}>
                            <AdminUsersTable approvedPending={userApprovedPending} />
                        </div>
                        : (
                            <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
                                No User Approval Pending user found !!
                            </p>
                        )
                }

                {/* <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
                                <tr key={i}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${u.status === "Active"
                                                ? "badge-success"
                                                : u.status === "Pending"
                                                    ? "badge-warning"
                                                    : "badge-error"
                                                }`}
                                        >
                                            {u.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
                <aside className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                    <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
                    <ul className="menu">
                        <li>
                            <a className="active">Dashboard</a>
                        </li>

                        {authUser?.role === "ADMIN" && (
                            <li>
                                <Link
                                    to="/userlist"
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <Users className="w-4 h-4 mr-1" />
                                    User List
                                </Link>
                            </li>
                        )}
                        {authUser?.role === "ADMIN" && (
                            <li>
                                <Link
                                    to="/approvedbiodata"
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <CircleCheck className="w-4 h-4 mr-1" />
                                    Approved Biodata
                                </Link>
                            </li>
                        )}
                        {authUser?.role === "ADMIN" && (
                            <li>
                                <Link
                                    to="/search-profiles"
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                                    All Biodata
                                </Link>
                            </li>
                        )}
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <LogoutButton className="hover:bg-primary hover:text-white">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </LogoutButton>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashBoardPage;

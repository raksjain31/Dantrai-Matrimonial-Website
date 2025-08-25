import React, { useState, useMemo, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, Trash, TrashIcon, X, ClockArrowUp } from "lucide-react";
import useAction from '../store/useAction'
import { useNavigate } from "react-router-dom";

const AdminUsersApprovedTable = ({ approveduser }) => {
    const { authUser } = useAuthStore();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { isUpdatingUserPending, onUpdatePendingUser } = useAction();
    const { isUpdateRejectingUser, onUpdateRejectingUser } = useAction();
    const [showHoverText, setShowHoverText] = useState(false);
    const [users, setUsers] = useState(approveduser || []);

    const navigation = useNavigate();
    const handleClick = () => {
        navigation('/add-profile');
    };



    useEffect(() => {
        setUsers(approveduser || []);
    }, [approveduser]);


    useEffect(() => {
        console.log("Users changed:", users);
    }, [users]);

    console.log("DATA:", approveduser)
    console.log("users:", users)

    // Filter problems based on search, difficulty, and tags

    // const filtereduser = useMemo(() => {
    //     return (approveduser || [])
    //         .filter((userApprovePending) =>
    //             userApprovePending.name.toLowerCase().includes(search.toLowerCase())
    //         )

    // }, [approveduser, search]);
    const filtereduser = useMemo(() => {
        return users.filter((user) => {
            const query = search.toLowerCase();

            return (
                (user.name && user.name.toLowerCase().includes(query)) ||
                (user.email && user.email.toLowerCase().includes(query)) ||
                (user.phone && user.phone.toLowerCase().includes(query))
            );
        });
    }, [users, search]);

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    }

    console.log("filteredProblems", filtereduser);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filtereduser.length / itemsPerPage);
    const paginatedUserApprovalPending = useMemo(() => {
        return filtereduser.slice(
            (currentPage - 1) * itemsPerPage,//0*5 =0
            currentPage * itemsPerPage)//0*1 =
    }, [filtereduser, currentPage])


    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    }

    console.log("paginatedUserApprovalPending", paginatedUserApprovalPending.length);
    const handleUpdate = async (id) => {
        const isConfirmed = confirm("Are you sure you want to Pending Status this User ?")
        if (isConfirmed) {
            try {
                await onUpdatePendingUser(id); // call API
            } catch (err) {
                console.error("Reject API failed:", err);
            } finally {
                // ✅ always update local state so table re-renders
                setUsers((prev) => prev.filter((u) => u.id !== id));
            }
        }


    };

    const handleRejectionUpdate = async (id) => {
        const isConfirmed = confirm("Are you sure you want to Reject this User ?")
        if (isConfirmed) {
            try {
                await onUpdateRejectingUser(id); // call API
            } catch (err) {
                console.error("Reject API failed:", err);
            } finally {
                // ✅ always update local state so table re-renders
                setUsers((prev) => prev.filter((u) => u.id !== id));
            }
        }



    };


    return (

        <div className="w-full max-w-6xl mx-auto mt-10">

            {/* Filters */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search by Name,Email and MobileNo"
                    className="input input-bordered w-full md:w-1/3 bg-base-200"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>



            {/* ===== Desktop Table ===== */}
            <div className="overflow-x-auto rounded-xl shadow-md hidden md:block">
                <table className="table table-zebra table-lg bg-base-200 text-base-content">
                    <thead className="bg-base-300">
                        <tr>
                            <th>SrNo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Father</th>
                            <th>Village</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUserApprovalPending.length > 0 ? (
                            paginatedUserApprovalPending.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                                    <td>
                                        <Link
                                            to={`/admin/get-user-profiles-byUserId/${user.id}`}
                                            className="font-semibold hover:underline"
                                        >
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.Father}</td>
                                    <td>{user.village}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdate(user.id)}
                                                className="btn btn-sm btn-success"
                                            >
                                                {isUpdatingUserPending ? (
                                                    <span className="loading loading-spinner text-white"></span>
                                                ) : (
                                                    <ClockArrowUp className="w-4 h-4 text-white" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleRejectionUpdate(user.id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                {isUpdateRejectingUser ? (
                                                    <span className="loading loading-spinner text-white"></span>
                                                ) : (
                                                    <X className="w-4 h-4 text-white" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No Approval Pending Users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ===== Mobile Cards ===== */}
            <div className="md:hidden space-y-4">
                {paginatedUserApprovalPending.length > 0 ? (
                    paginatedUserApprovalPending.map((user, index) => (
                        <div
                            key={user.id}
                            className="bg-base-200 rounded-xl p-4 shadow-md space-y-1"
                        >
                            <p className="font-semibold text-lg">

                                <Link to={`/admin/get-user-profiles-byUserId/${user.id}`} className="font-semibold hover:underline" >
                                    {(currentPage - 1) * itemsPerPage + (index + 1)}. {user.name}
                                </Link>


                            </p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm">📞 {user.phone}</p>
                            <p className="text-sm">👤 Father: {user.Father}</p>
                            <p className="text-sm">🏡 Village: {user.village}</p>

                            {/* Profiles */}
                            {user.profiles.length > 0 ? (
                                <div className="mt-2">
                                    <p className="font-medium">Biodata:</p>
                                    <ul className="list-disc ml-4 text-sm">
                                        {user.profiles.map((p) => (
                                            <li key={p.id}>
                                                <p><span className="font-medium">Son/Daughter's Name:</span> {p.fullname}</p>
                                                <p><span className="font-medium">Gender:</span> {p.gender}</p>
                                                <p><span className="font-medium">DOB:</span> {new Date(p.dateOfBirth).toISOString().split("T")[0]}</p>
                                                <p><span className="font-medium">Age:</span> {calculateAge(p.dateOfBirth)} Yrs</p>
                                                <p><span className="font-medium">City:</span> {p.currentLiveCity}</p>
                                                <p><span className="font-medium">Education:</span> {p.education}</p>
                                                <p><span className="font-medium">Phone:</span> {p.phone}</p>

                                            </li>

                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No profiles</p>
                            )}

                            <div className="flex gap-2 mt-3">
                                <span>
                                    <button
                                        onClick={() => handleUpdate(user.id)}
                                        className="btn btn-xs btn-success w-full h-9"
                                    >
                                        {isUpdatingUserPending ? "..." : "Pending"}
                                    </button>
                                </span>
                                <span>
                                    <button
                                        onClick={() => handleRejectionUpdate(user.id)}
                                        className="btn btn-xs btn-error w-full h-9"
                                    >
                                        {isUpdateRejectingUser ? "..." : "Reject"}
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No Approval Pending Users found.
                    </p>
                )}
            </div>

            {/* ===== Pagination ===== */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    className="btn btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>

    )
}

export default AdminUsersApprovedTable
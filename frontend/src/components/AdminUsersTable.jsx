import React, { useState, useMemo } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, Trash, TrashIcon, CircleCheckBig } from "lucide-react";
import useAction from '../store/useAction'
import { useNavigate } from "react-router-dom";

const AdminUsersTable = ({ approvedPending }) => {
    const { authUser } = useAuthStore();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { isUpdatingUser, onUpdateUser } = useAction();
    const [showHoverText, setShowHoverText] = useState(false);

    const navigation = useNavigate();
    const handleClick = () => {
        navigation('/add-profile');
    };

    console.log("DATA:", approvedPending)
    // Filter problems based on search, difficulty, and tags
    const filtereduser = useMemo(() => {
        return (approvedPending || [])
            .filter((userApprovePending) =>
                userApprovePending.name.toLowerCase().includes(search.toLowerCase())
            )

    }, [approvedPending, search]);

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

    console.log("paginatedUserApprovalPending", paginatedUserApprovalPending.length);
    const handleUpdate = (id) => {
        const isConfirmed = confirm("Are you sure you want to Approve this User ?")
        if (isConfirmed) {
            onUpdateUser(id);
        }


    };


    return (
        <div className="w-full max-w-6xl mx-auto mt-10" >

            {/* Filters */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="input input-bordered w-full md:w-1/3 bg-base-200"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* <select
                    className="select select-bordered bg-base-200"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="ALL">All Difficulties</option>
                    {difficulties.map((diff) => (
                        <option key={diff} value={diff}>
                            {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-bordered bg-base-200"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                >
                    <option value="ALL">All Tags</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select> */}
            </div>

            < div className="overflow-x-auto rounded-xl shadow-md" >
                <table className="table table-zebra table-lg bg-base-200 text-base-content" >
                    <thead className="bg-base-300" >
                        <tr>
                            <th>SrNo </th>
                            < th > Name </th>
                            < th > Email </th>
                            < th > Phone </th>
                            < th > Father </th>
                            < th > Village </th>
                            < th > Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedUserApprovalPending.length > 0 ? (
                                paginatedUserApprovalPending.map((user, index) => {

                                    return (
                                        <tr key={user.id} >
                                            <td>

                                                {index + 1
                                                }
                                            </td>
                                            < td >
                                                <Link to={`/profile/get-user-profiles-byUserId/${user.id}`} className="font-semibold hover:underline" >
                                                    {user.name}
                                                </Link>
                                            </td>
                                            <td>
                                                {user.email}
                                            </td>
                                            <td>

                                                {user.phone}
                                            </td>
                                            <td>
                                                {user.Father}

                                            </td>
                                            <td>

                                                {user.village}

                                            </td>
                                            < td >
                                                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center" >
                                                    {authUser?.role === "ADMIN" && (
                                                        <div className="flex gap-2" >
                                                            <button
                                                                onClick={() => handleUpdate(user.id)}
                                                                className="btn btn-sm btn-error"
                                                                onMouseEnter={() => setShowHoverText(true)}
                                                                onMouseLeave={() => setShowHoverText(false)}
                                                            >

                                                                {
                                                                    isUpdatingUser ? (
                                                                        <span className="loading loading-spinner text-white" > </span>
                                                                    ) : (
                                                                        <CircleCheckBig className="w-4 h-4 text-white" />
                                                                    )
                                                                }
                                                                {showHoverText && <p>Approve User!</p>}
                                                            </button>
                                                            < button disabled className="btn btn-sm btn-warning" >
                                                                <PencilIcon className="w-4 h-4 text-white" />
                                                            </button>
                                                        </div>
                                                    )}

                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500" >
                                        No Approval Pending Users found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AdminUsersTable
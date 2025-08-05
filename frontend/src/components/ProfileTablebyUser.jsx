import React, { useState, useMemo } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, Trash, TrashIcon, Plus } from "lucide-react";
import useAction from '../store/useAction'
import { useNavigate } from "react-router-dom";

const ProfileTablebyUser = ({ profilesByUser }) => {
    const { authUser } = useAuthStore();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { isDeletingProfile, onDeleteProfile } = useAction();

    const navigation = useNavigate();
    const handleClick = () => {
        navigation('/add-profile');
    };
    // Filter problems based on search, difficulty, and tags
    const filteredProblems = useMemo(() => {
        return (profilesByUser || [])
            .filter((profile) =>
                profile.fullname.toLowerCase().includes(search.toLowerCase())
            )

    }, [profilesByUser, search]);
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
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
    const paginatedProfiles = useMemo(() => {
        return filteredProblems.slice(
            (currentPage - 1) * itemsPerPage,//0*5 =0
            currentPage * itemsPerPage)//0*1 =
    }, [filteredProblems, currentPage])

    const handleDelete = (id) => {
        const isConfirmed = confirm("Are you sure you want to delete this Profile ?")
        if (isConfirmed) {
            onDeleteProfile(id);
        }


    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-10">
            {/* Header with Create Playlist Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profiles of your family</h2>
                <button
                    className="btn bg-purple-800 gap-2"
                    onClick={handleClick}
                >
                    <Plus className="w-4 h-4" />
                    Create Profile
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-md">
                <table className="table table-zebra table-lg bg-base-200 text-base-content">
                    <thead className="bg-base-300">
                        <tr>
                            <th>SrNo</th>
                            <th>NAME</th>
                            <th>GENDER</th>
                            <th>DOB</th>
                            <th>AGE</th>
                            <th>Education</th>
                            {authUser?.role === "USER" && (<th>Actions</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedProfiles.length > 0 ? (
                                paginatedProfiles.map((profile, index) => {

                                    return (
                                        <tr key={profile.id}>
                                            <td>

                                                {index + 1}
                                            </td>
                                            <td>
                                                <Link to={`/profile/${profile.id}`} className="font-semibold hover:underline">
                                                    {profile.fullname}
                                                </Link>
                                            </td>
                                            <td>
                                                {profile.gender}
                                            </td>
                                            <td>

                                                {profile?.dateOfBirth && !isNaN(new Date(profile.dateOfBirth))
                                                    ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                {calculateAge(profile.dateOfBirth)}

                                            </td>
                                            <td>

                                                {profile.education}

                                            </td>
                                            <td>
                                                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                                                    {/* {authUser?.role === "USER" && ( */}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleDelete(profile.id)}
                                                            className="btn btn-sm btn-error"
                                                        >

                                                            {
                                                                isDeletingProfile ? (
                                                                    <span className="loading loading-spinner text-white"></span>
                                                                ) : (
                                                                    <TrashIcon className="w-4 h-4 text-white" />
                                                                )
                                                            }

                                                        </button>
                                                        <button disabled className="btn btn-sm btn-warning">
                                                            <PencilIcon className="w-4 h-4 text-white" />
                                                        </button>
                                                    </div>
                                                    {/* )} */}

                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">
                                        No problems found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ProfileTablebyUser
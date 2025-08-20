import React, { useState, useMemo } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, Trash, TrashIcon, Plus } from "lucide-react";
import useAction from '../store/useAction'
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from './ThemeSwitcher';

const ProfileTablebyUser = ({ profilesByUser }) => {
    const { authUser } = useAuthStore();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { isDeletingProfile, onDeleteProfile } = useAction();
    const { isEditingProfile, onEditProfile } = useAction();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigation = useNavigate();
    const handleClick = () => {
        navigation('/add-profile');
    };

    const watermarkText = `"${authUser.email}  ${authUser.phone}"`;

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
        <div className='container mx-auto py-8 px-4 max-w-7xl'>
            <div className="   h-screen w-full max-w-6xl mx-auto mt-10 px-2 sm:px-4 ">
                {/* Header with Create Playlist Button //justify-between */}
                <div className="flex flex-col sm:flex-row  items-start sm:items-center mb-6 gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold">Biodata's of your family</h2>
                    <button
                        className="btn btn-sm sm:btn-md bg-purple-800 gap-2 w-full sm:w-auto"
                        onClick={handleClick}
                    >
                        <Plus className="w-4 h-4 text-white" />
                        <p className="text-sm text-white"> Create Biodata</p>
                    </button>
                </div>

                {/* Table wrapper for mobile scroll */}

                <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">

                    <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-[800px] w-full text-sm text-left text-gray-500 dark:text-gray-400"
                            style={{ "--watermark-text": watermarkText }}>
                            <thead className="bg-base-300">
                                <tr>
                                    <th className="px-4 py-3">SrNo</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Gender</th>
                                    <th className="px-4 py-3">DOB</th>
                                    <th className="px-4 py-3">Age</th>
                                    <th className="px-4 py-3">Education</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProfiles.map((profile, index) => (
                                    <tr key={profile.id} className="border-b">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="flex gap-2 flex-wrap px-4 py-3">
                                            <Link
                                                to={`/profile/get-profile/${profile.id}`}
                                                className="font-semibold hover:underline"
                                            >
                                                {profile.fullname}
                                                <div className="text-xs text-gray-500">
                                                    {authUser.email} {authUser.phone}
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">{profile.gender}</td>
                                        <td className="px-4 py-3">
                                            {new Date(profile.dateOfBirth).toISOString().split("T")[0]}
                                        </td>
                                        <td className="px-4 py-3">{calculateAge(profile.dateOfBirth)}</td>
                                        <td className="px-4 py-3">{profile.education}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2 flex-wrap">
                                                <button
                                                    onClick={() => handleDelete(profile.id)}
                                                    className="btn btn-xs sm:btn-sm btn-error"
                                                >
                                                    {isDeletingProfile ? (
                                                        <span className="loading loading-spinner text-white"></span>
                                                    ) : (
                                                        <TrashIcon className="w-4 h-4 text-white" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => navigation(`/update-profile/${profile.id}`)}
                                                    className="btn btn-xs sm:btn-sm btn-warning"
                                                >
                                                    {isEditingProfile ? (
                                                        <span className="loading loading-spinner text-white"></span>
                                                    ) : (
                                                        <PencilIcon className="w-4 h-4 text-white" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>




                    {/* Mobile Card View */}
                    <div className="sm:hidden space-y-4">
                        {paginatedProfiles.map((profile, index) => (
                            <div
                                key={profile.id}
                                className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800"
                            >
                                {/* <h3 className="font-bold text-lg text-white">{profile.fullname}</h3> */}
                                <h3 className="font-bold text-lg ">
                                    <Link
                                        to={`/profile/get-profile/${profile.id}`}
                                        className="font-semibold  hover:underline"
                                    >
                                        {profile.fullname}
                                        <div className="text-xs text-gray-500">
                                            {authUser.email} {authUser.phone}
                                        </div>
                                    </Link>
                                </h3>
                                <p className="text-sm text-gray-600">Gender: {profile.gender}</p>
                                <p className="text-sm text-gray-600">
                                    DOB: {new Date(profile.dateOfBirth).toISOString().split("T")[0]}
                                </p>
                                <p className="text-sm  text-gray-600">
                                    Age: {calculateAge(profile.dateOfBirth)}
                                </p>
                                <p className="text-sm  text-gray-600">Education: {profile.education}</p>

                                {/* Actions */}
                                <div className="flex gap-2 mt-3">
                                    {/* <button className="btn btn-xs btn-error">Delete</button>
                                    <button className="btn btn-xs btn-warning">Edit</button>
                                     */}

                                    <button
                                        onClick={() => handleDelete(profile.id)}
                                        className="btn btn-xs sm:btn-sm btn-error"
                                    >
                                        {isDeletingProfile ? (
                                            <span className="loading loading-spinner text-white"></span>
                                        ) : (
                                            <TrashIcon className="w-4 h-4 text-white" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => navigation(`/update-profile/${profile.id}`)}
                                        className="btn btn-xs sm:btn-sm btn-warning"
                                    >
                                        {isEditingProfile ? (
                                            <span className="loading loading-spinner text-white"></span>
                                        ) : (
                                            <PencilIcon className="w-4 h-4 text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ProfileTablebyUser
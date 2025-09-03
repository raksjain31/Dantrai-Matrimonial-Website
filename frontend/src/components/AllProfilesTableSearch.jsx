import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, Trash, PhoneCall, TrashIcon, Plus } from "lucide-react";
import useAction from '../store/useAction'
import { useNavigate } from "react-router-dom";

const AllProfilesTableSearch = ({ AllprofilesSearch, listKey = "default" }) => {
    const { authUser } = useAuthStore();
    const tableRef = useRef(null);
    // ✅ Use unique key for each page
    const storageKey = `profilePage_${listKey}`;

    const [search, setSearch] = useState("");
    const [village, setVillageSearch] = useState("ALL");

    const [searchcurrentLiveCity, setCurrentLiveCitySearch] = useState(""); // Add state for searchcurrentLiveCity
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(localStorage.getItem(storageKey)) || 1;
    });
    const { isDeletingProfile, onDeleteProfile } = useAction();
    const [gender, setGender] = useState("ALL");

    const navigation = useNavigate();
    const handleClick = () => {
        navigation('/add-profile');
    };



    //     DANTRAI
    //   NIMBAJ
    //   MALGAON
    //   AMBLARI
    //   ANADARA
    //   MAROL
    //   PAMERA
    //   POSINDARA
    //   DHAN
    //   MADIYA
    //   MERMODAVARA
    const watermarkText = `"${authUser.email}  ${authUser.phone}"`;
    // Filter problems based on search,villagesearch, gender, and minage,maxage
    const filteredAllProfilesSearch = useMemo(() => {
        return (AllprofilesSearch || [])
            .filter((profile) =>
                profile.fullname.toLowerCase().includes(search.toLowerCase())
            )
            .filter((profile) =>
                gender === "ALL" ? true : profile.gender === gender
            )
            // .filter((profile) =>
            //     profile.user.village.toLowerCase().includes(village.toLowerCase())
            // )
            .filter((profile) =>
                village === "ALL" ? true : profile.user.village === village
            )
            .filter((profile) =>
                profile.currentLiveCity.toLowerCase().includes(searchcurrentLiveCity.toLowerCase())
            )
            .filter((profile) => {
                if (!minAge && !maxAge) return true; // No filter if both are empty
                const age = calculateAge(profile.dateOfBirth);
                if (minAge && age < Number(minAge)) return false;
                if (maxAge && age > Number(maxAge)) return false;
                return true;
            });
    }, [AllprofilesSearch, search, , village, gender, minAge, maxAge, searchcurrentLiveCity]);


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


    useEffect(() => {
        localStorage.setItem(storageKey, currentPage);
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [currentPage, storageKey]);


    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredAllProfilesSearch.length / itemsPerPage);
    const paginatedProfiles = useMemo(() => {
        return filteredAllProfilesSearch.slice(
            (currentPage - 1) * itemsPerPage,//0*5 =0
            currentPage * itemsPerPage)//0*1 =
    }, [filteredAllProfilesSearch, currentPage])


    const genders = ["MALE", "FEMALE"];


    const VillagesArray = ["DANTRAI",
        "NIMBAJ",
        "MALGAON",
        "AMBLARI",
        "ANADARA",
        "MAROL",
        "PAMERA",
        "POSINDARA",
        "DHAN",
        "MADIYA",
        "MERMODAVARA"];

    const handleDelete = (id) => {
        const isConfirmed = confirm("Are you sure you want to delete this Profile ?")
        if (isConfirmed) {
            onDeleteProfile(id);
        }


    };
    const handleCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-10">
            {/* Watermark */}
            <div className="watermark">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="watermark-text"
                        style={{
                            top: `${(i % 10) * 100}px`,
                            left: `${Math.floor(i / 10) * 300}px`,
                        }}
                    >
                        {authUser.email} | {authUser.phone}
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Search For Biodata's</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="input input-bordered w-full md:w-1/3 bg-base-200"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* <input
                    type="text"
                    placeholder="Search by Village"
                    className="input input-bordered w-full md:w-1/3 bg-base-200"
                    value={searchvillage}
                    onChange={(e) => setVillageSearch(e.target.value)}
                /> */}

                <select
                    className="select select-bordered bg-base-200"
                    value={village}
                    onChange={(e) => setVillageSearch(e.target.value)}
                >
                    <option value="ALL">All Villages</option>
                    {VillagesArray.map((diff) => (
                        <option key={diff} value={diff}>
                            {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-bordered bg-base-200"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="ALL">All Gender</option>
                    {genders.map((diff) => (
                        <option key={diff} value={diff}>
                            {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Min Age"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    className="border p-2"


                />
                <input
                    type="text"
                    placeholder="Search by City of Residence"
                    className="input input-bordered w-full md:w-1/3 bg-base-200"
                    value={searchcurrentLiveCity}
                    onChange={(e) => setCurrentLiveCitySearch(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Age"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    className="border p-2 ml-2"
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

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto rounded-xl shadow-md">
                <table
                    className="table table-watermark table-zebra table-lg bg-base-200 text-base-content min-w-[1000px]"
                    style={{
                        "--watermark-text": watermarkText,
                        backgroundRepeat: "repeat",
                        backgroundPosition: "center",
                    }}
                >
                    <thead className="bg-base-300">
                        <tr>
                            <th>SrNo</th>
                            <th>NAME</th>
                            <th>Father</th>
                            <th>GENDER</th>
                            <th>DOB</th>
                            <th>AGE</th>
                            <th>HEIGHT</th>
                            <th>EDUCATION</th>
                            <th>VILLAGE</th>
                            <th>CITY</th>

                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProfiles.length > 0 ? (
                            paginatedProfiles.map((profile, index) => (
                                <tr key={profile.id}>
                                    <td>{index + 1}</td>
                                    <td>
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
                                    <td>{profile.father}</td>
                                    <td>{profile.gender}</td>
                                    <td>
                                        {profile?.dateOfBirth &&
                                            !isNaN(new Date(profile.dateOfBirth))
                                            ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
                                            : "N/A"}
                                    </td>
                                    <td>{calculateAge(profile.dateOfBirth)}</td>
                                    <td>{profile.height}</td>
                                    <td>{profile.education}</td>
                                    <td>{profile.user.village}</td>
                                    <td>{profile.currentLiveCity}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={11} className="text-center py-6 text-gray-500">
                                    No profiles found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div ref={tableRef} className="sm:hidden space-y-4">
                {paginatedProfiles.length > 0 ? (
                    paginatedProfiles.map((profile, index) => (
                        <div
                            key={profile.id}
                            className="border rounded-lg p-4 shadow-sm bg-base-200"
                        >
                            <h3 className="font-bold text-lg">
                                <Link
                                    to={`/profile/get-profile/${profile.id}`}
                                    className="font-semibold hover:underline"
                                >
                                    {profile.fullname}
                                    <div className="text-xs text-gray-500">
                                        {authUser.email} {authUser.phone}
                                    </div>
                                </Link>
                            </h3>

                            <p><span className="font-medium">
                                Father:</span> {profile.user.name}
                            </p>
                            <p ><span className="font-medium">
                                Grand Father: </span>{profile.user.Father}
                            </p>

                            <p ><span className="font-medium">
                                Mother:  </span>{profile.mother}
                            </p>
                            <p ><span className="font-medium">
                                Gotra:</span> {profile.gotra}
                            </p>
                            <p><span className="font-medium">
                                Gender: </span>{profile.gender}
                            </p>
                            <p ><span className="font-medium">
                                DOB:</span>{" "}
                                {profile?.dateOfBirth &&
                                    !isNaN(new Date(profile.dateOfBirth))
                                    ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
                                    : "N/A"}
                            </p>
                            <p ><span className="font-medium">
                                Age: </span>{calculateAge(profile.dateOfBirth)}
                            </p>
                            <p ><span className="font-medium">
                                Height:</span> {profile.height}
                            </p>
                            <p ><span className="font-medium">
                                Education:</span> {profile.education}
                            </p>
                            <p><span className="font-medium">
                                Village:</span> {profile.user.village}
                            </p>
                            <p ><span className="font-medium">
                                City: </span>{profile.currentLiveCity}
                            </p>

                            <a

                                href={`tel:${profile.user.phone}`}

                                className="px-4  rounded-2xl mt-4 bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition"
                            >

                                Call Now

                            </a>

                            {/* Actions */}

                        </div>
                    ))
                ) : (
                    <p className="text-center py-6 text-gray-500">No profiles found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    className="btn btn-sm "
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Prev
                </button>
                <span className="btn btn-ghost btn-sm">
                    {currentPage} / {totalPages}
                </span>
                <button
                    className="btn btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default AllProfilesTableSearch
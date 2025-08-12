
import React, { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { useParams } from 'react-router-dom';
import { useProfileStore } from '../store/useProfileStore';
import {
    Loader, ImageUp,
    FileText,
    Lightbulb,
    BookOpen,
    CheckCircle2,
    Download,
    User,
    Briefcase,
    GraduationCap, House
} from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

export default function UserFamilyProfileView() {

    const isDarkMode =
        document.documentElement.getAttribute("data-theme") === "dark";

    const { id } = useParams();
    const { getProfileDataById, profile, isProfileLoading } = useProfileStore();
    const { authUser } = useAuthStore();
    console.log(`ID in profileview: ${id}`);
    const [profiles, setProfile] = useState(null);

    useEffect(() => {


        getProfileDataById(id);

    }, [id]);

    useEffect(() => {

        setProfile(profile)
    }, [profile]);

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


    console.log("length profile by id", profile);
    console.log("length profile by id", profile);
    if (!profiles || isProfileLoading) {

        return <div className='min-h-screen flex items-center justify-center'>
            <Loader className='size-10 animate-spin justify-center' />
        </div>
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">

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
            <div className="text-2xl font-bold text-center ">{profile.fullname}'s Profile</div>


            {/* Basic Information */}
            <div className="flex items-center justify-center bg-base-100">
                <div className="flex  bg-base-200 rounded-lg overflow-hidden select-none "
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                        display: "flex",
                        width: "300px",
                        height: "300px",
                        overflow: "hidden",

                        borderRadius: "8px",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    <img
                        src={profile.image}
                        alt="Preview"
                        className=" w-48 h-48 object-cover object-center rounded-lg items-center"

                        style={{
                            width: "100%",
                            height: "100%",

                            display: "block", // remove inline gap issues
                            objectFit: "cover" // keeps aspect ratio and fills the box
                            //objectFit: "contain"
                        }}
                    />
                    {/* Watermark Overlay */}

                </div>
            </div>


            <div className="card bg-base-100 shadow-md border select-none"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()} >
                <div className="card-body ">
                    <h2 className="card-title text-lg text-primary">
                        <User className="w-5 h-5 text-warning" />
                        Basic Information
                        <div className='text-xs text-color:gray-300'>
                            {authUser.email}{authUser.phone}
                        </div></h2>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className='no-select'><strong>Name:</strong> {profile.fullname}</div>

                        <div className='no-select'><strong>Gender:</strong> {profile.gender}</div>
                        <div className='no-select'><strong>Height:</strong> {profile.height}</div>
                        <div><strong>City:</strong> {profile.currentLiveCity}</div>
                        <div><strong>Date of Birth:</strong> {profile?.dateOfBirth && !isNaN(new Date(profile.dateOfBirth))
                            ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
                            : "N/A"}</div>
                        <div><strong>Age:</strong>  {calculateAge(profile.dateOfBirth)}</div>
                        <div><strong>About me:</strong> {profile.aboutme}</div>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className="card bg-base-100 shadow-md border select-none"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()} >
                <div className="card-body">
                    <h2 className="card-title text-lg text-primary">
                        <BookOpen className="w-5 h-5 text-warning" />
                        Education
                        <div className='text-xs text-color:gray-300'>
                            {authUser.email}{authUser.phone}
                        </div>
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div><strong>Highest Qualification:</strong> {profile.education}</div>
                        <div><strong>University/College:</strong> {profile.college}</div>
                        <div><strong>About My Education :</strong> {profile.aboutmyeducation}</div>
                    </div>
                </div>
            </div>

            {/* Occupation ₹ */}
            <div className="card bg-base-100 shadow-md border select-none"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()} >
                <div className="card-body">
                    <h2 className="card-title text-lg text-primary">
                        <Briefcase className="w-5 h-5 text-warning" />
                        Occupation
                        <div className='text-xs text-color:gray-300'>
                            {authUser.email}{authUser.phone}
                        </div>
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div><strong>Employed In:</strong> {profile.employedIn}</div>
                        <div><strong>Occupation:</strong> {profile.occupation}</div>
                        <div><strong>Organisation :</strong> {profile.organisation}</div>
                    </div>
                </div>
            </div>

            {/* Family Background */}
            <div className="card bg-base-100 shadow-md border select-none"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()} >
                <div className="card-body">
                    <h2 className="card-title text-lg text-primary">
                        <House className="w-5 h-5 text-warning" />
                        Family Background
                        <div className='text-xs text-color:gray-300'>
                            {authUser.email}{authUser.phone}
                        </div>
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div><strong>Father's Name:</strong> {profile.father}</div>
                        <div><strong>Mother's Name:</strong> {profile.mother}</div>
                        <div><strong>No of Brothers:</strong> {profile.noOfBrothers}</div>
                        <div><strong>No of Married Brothers:</strong> {profile.noOfMarriedBrothers}</div>
                        <div><strong>No of Sisters:</strong> {profile.noOfsisters}</div>
                        <div><strong>No of Married Sisters:</strong> {profile.noOfMarriedSisters}</div>
                    </div>
                </div>
            </div>


        </div >
    );
}

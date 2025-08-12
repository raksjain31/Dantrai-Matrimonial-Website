// ProfileListView.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { useParams } from 'react-router-dom';
import { useProfileStore } from '../store/useProfileStore';

export default function ProfileView() {
    const { id } = useParams();
    const { getProfilesByUserId, profilesByUserId, isProfileLoading } = useProfileStore();
    const { authUser } = useAuthStore();
    console.log(`ID in profileview: ${id}`);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        // const fetchProfiles = async () => {
        //     try {

        //         const response = await axiosInstance.get(`/profile/get-user-profiles-byUserId/${id}`);
        //         setProfiles(response.data.profiles);

        //     } catch (error) {
        //         console.error('Error fetching profiles:', error);
        //     }
        // };
        // fetchProfiles();
        getProfilesByUserId(id);

    }, [id]);

    useEffect(() => {

        setProfiles(profilesByUserId)
    }, [profilesByUserId]);

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    };

    console.log("length in table view", profiles.length);
    console.log("length in table view", profiles);
    if (profiles.length <= 0)
        return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

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

            {profiles.map((profile, id) => (
                <div key={id} className=" card bg-base-100 w-150 shadow-sm" >
                    <div className="flex flex-col items-center p-6">

                        <figure className="px-10 pt-10">

                            <img border="4"
                                width={300}
                                height={300}
                                src={profile.image}
                                alt="profile"
                                className="rounded-xl" />

                        </figure>

                        <div className="card-body items-center text-center border border-white rounded-2xl select-none">
                            <h2 className="card-title">Card Title</h2>
                            <h2 className="text-xl font-bold mb-2">{profile.fullName}</h2>
                            <p className="text-white-700"><strong>Name: </strong> {profile.fullname}</p>
                            <p className="text-white-700"><strong>Father: </strong> {profile.father}</p>
                            <p className="text-white-700"><strong>Mother: </strong> {profile.mother}</p>
                            <p className="text-white-700"><strong>Gender:</strong> {profile.gender}</p>
                            <p className="text-white-700"><strong>DOB: </strong> {profile.dateOfBirth?.slice(0, 10)}</p>
                            <p className="text-white-700"><strong>Age: </strong> {calculateAge(profile.dateOfBirth)} years</p>
                            <p className="text-white-700"><strong>Height: </strong> {profile.height}</p>
                            <p className="text-white-700"><strong>PhoneNo: </strong> {profile.phone}</p>
                            <p className="text-white-700"><strong>Education: </strong> {profile.education}</p>
                            <p className="text-white-700"><strong>Employeed IN: </strong> {profile.employedIn}</p>
                            <p className="text-white-700"><strong>Occupation: </strong> {profile.occupation}</p>
                            <p className="text-white-700"><strong>Current City: </strong> {profile.currentLiveCity}</p>
                        </div>

                    </div>
                </div>
            ))
            }
        </div >
    );
}


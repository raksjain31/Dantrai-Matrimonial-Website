import React, { useEffect } from 'react';
import { useProfileStore } from '../store/useProfileStore';
import { Loader } from "lucide-react";
import ProfileTablebyUser from '../components/ProfileTablebyUser';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
    const { authuser } = useAuthStore();
    const { getProfileByUser, profilesByUser, isProfileLoading } = useProfileStore();

    useEffect(() => {
        getProfileByUser();
    }, [getProfileByUser]);

    if (isProfileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center mt-10 sm:mt-14 px-3 sm:px-4 w-full relative overflow-hidden">

            {/* Decorative Background - hidden on mobile if causing issues */}
            <div className="hidden sm:block absolute top-16 left-0 w-1/3 h-1/3 bg-purple-800 opacity-30 blur-3xl rounded-md"></div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold z-10 text-center px-2">
                Welcome to <span className="text-purple-800">Abugoad Youth Connect</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-center text-base sm:text-lg font-medium text-gray-500 dark:text-gray-400 z-10 px-2">
                A platform for Abugoad's eleven village family members to connect with each other in real time.
            </p>

            {/* Profiles */}
            {profilesByUser.length > 0 ? (
                <div className="mt-6 w-full">
                    <ProfileTablebyUser profilesByUser={profilesByUser} />
                </div>
            ) : (
                <p className="mt-8 sm:mt-10 text-center text-base sm:text-lg font-medium text-gray-500 dark:text-gray-400 z-10 border border-primary px-3 sm:px-4 py-2 rounded-md border-dashed max-w-sm">
                    No profile found. Please add your son/daughter’s profile.
                </p>
            )}
        </div>
    );
};

export default HomePage;
import React, { useEffect } from 'react'

import { useProfileStore } from '../store/useProfileStore'
import { Loader } from "lucide-react";
import ProfileTablebyUser from '../components/ProfileTablebyUser';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
    const { authuser } = useAuthStore();

    const { getProfileByUser, profilesByUser, isProfileLoading } = useProfileStore();


    useEffect(() => {

        getProfileByUser()



    }, [getProfileByUser])

    if (isProfileLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <Loader className='size-10 animate-spin justify-center' />
            </div>
        )
    }

    return (
        <div className='min-h-screen flex flex-col items-center mt-14 px-4' >
            {/* <div className="min-h-screen flex flex-col items-center mt-8 md:mt-14 px-2 sm:px-4 lg:px-8 w-full"> */}
            <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-purple-800 opacity-30 blur-3xl rounded-md bottom-9"></div>
            <h1 className="text-4xl font-extrabold z-10 text-center">
                Welcome to <span className="text-purple-800  ">Abugoad Youth Connect</span>
            </h1>

            <p className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
                A platform for Abugoad's eleven village family members can connect with each others in real - time.
            </p>


            {

                profilesByUser.length > 0 ? <ProfileTablebyUser profilesByUser={profilesByUser} /> : (
                    <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
                        No Profile found Please Add Your Son/Daughter Profile
                    </p>
                )
            }
        </div>




    )
}

export default HomePage
import React, { useEffect } from 'react'

import { useProfileStore } from '../store/useProfileStore'
import { Loader } from "lucide-react";
import ProfileTablebyUser from '../components/ProfileTablebyUser';
import { useAuthStore } from '../store/useAuthStore';
import AllProfilesTableSearch from '../components/AllProfilesTableSearch';
import { useNavigate } from 'react-router-dom';

const AllProfilesSearchPage = () => {
    const { authUser } = useAuthStore();

    const { getAllProfile, profiles, isProfileLoading } = useProfileStore();

    const navigation = useNavigate();
    useEffect(() => {
        getAllProfile()

    }, [getAllProfile])

    if (isProfileLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <Loader className='size-10 animate-spin justify-center' />
            </div>
        )
    }

    return (
        <div className='min-h-screen flex flex-col items-center mt-14 px-4' >
            <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-purple-800 opacity-30 blur-3xl rounded-md bottom-9"></div>
            <h1 className="text-4xl font-extrabold z-10 text-center">
                Search  <span className="text-purple-800  ">Match Biodata</span>
            </h1>

            {authUser && (


                profiles.length > 0 ? <AllProfilesTableSearch AllprofilesSearch={profiles} listKey="allprofiles" /> : (
                    <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
                        ❌❌No Biodata found!!
                    </p>
                )

            )}
        </div>




    )
}

export default AllProfilesSearchPage
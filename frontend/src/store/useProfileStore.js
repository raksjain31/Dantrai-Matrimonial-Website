import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";




export const useProfileStore = create((set) => ({
    profiles: [],
    profile: null,
    profilesByUser: [],
    profilesByUserId: [],
    isProfilesLoading: false,
    isProfileLoading: false,
    isUserLoading: false,
    user: null,



    getAllProfile: async () => {

        try {

            set({ isProfilesLoading: true })

            const res = await axiosInstance.get("/profile/get-all-profiles");

            set({ profiles: res.data.profiles });
        } catch (error) {
            console.log("Error getting all Biodata", error);
            toast.error("Error in Getting All Biodata")

        }

        finally {
            set({ isProfilesLoading: false })
        }

    },


    getAllRejectedProfile: async () => {

        try {

            set({ isProfilesLoading: true })

            const res = await axiosInstance.get("/profile/get-all-rejected-profiles");

            set({ profiles: res.data.profiles });
        } catch (error) {
            console.log("Error getting Rejected Biodata", error);
            toast.error("Error in Getting Rejected Biodata")

        }

        finally {
            set({ isProfilesLoading: false })
        }

    },



    getTotalProfile: async () => {

        try {

            set({ isProfilesLoading: true })

            const res = await axiosInstance.get("/profile/get-total-profiles");

            set({ profiles: res.data.profiles });
        } catch (error) {
            console.log("Error getting Total Biodata", error);
            toast.error("Error in Getting Total Biodata")

        }

        finally {
            set({ isProfilesLoading: false })
        }

    },

    getFemaleProfile: async () => {

        try {

            set({ isProfilesLoading: true })

            const res = await axiosInstance.get("/profile/get-female-profiles");

            set({ profiles: res.data.profiles });
        } catch (error) {
            console.log("Error getting Female Biodata", error);
            toast.error("Error in Getting Female Biodata")

        }

        finally {
            set({ isProfilesLoading: false })
        }

    },


    getMaleProfile: async () => {

        try {

            set({ isProfilesLoading: true })

            const res = await axiosInstance.get("/profile/get-male-profiles");

            set({ profiles: res.data.profiles });
        } catch (error) {
            console.log("Error getting Male Biodata", error);
            toast.error("Error in Getting Male Biodata")

        }

        finally {
            set({ isProfilesLoading: false })
        }

    },

    getAllApprovedProfile: async () => {

        try {

            set({ isProfilesLoading: true })

            const res = await axiosInstance.get("/profile/get-Approved-biodata");

            set({ profiles: res.data.profiles });
        } catch (error) {
            console.log("Error getting Approved Biodata", error);
            toast.error("Error in Getting Approved Biodata")

        }

        finally {
            set({ isProfilesLoading: false })
        }

    },
    getProfileDataById: async (id) => {
        try {
            console.log(`ID:::${id}`);
            set({ isProfileLoading: true })
            const res = await axiosInstance.get(`/profile/get-profile/${id}`);
            set({ profile: res.data.profile });
            //toast.success(res.data.message);
            console.log("Data profile by id:::", res.data.profile);
        } catch (error) {
            console.log("Error getting profile by id", error);
            toast.error("Error in Getting Profile");

        }
        finally {
            set({ isProfileLoading: false })
        }

    },

    getProfileByUser: async () => {

        try {

            set({ isProfileLoading: true })
            const res = await axiosInstance("/profile/get-profiles-by-user");


            console.log("Profile Fetched for User Sucessfully", res.data.profiles);
            toast.dismiss();
            if (res.data.profiles.length === 0) {
                toast.error("No Biodata found \n Please Add Biodata ⚠️");
            }
            else {
                toast.success("Biodata Fetched for User Sucessfully⚡");
            }

            set({ profilesByUser: res.data.profiles });

        } catch (error) {
            console.log("Error getting profiles by Users", error);
            toast.dismiss();
            toast.error("Error in Getting Profile by Users");

        }
        finally {
            set({ isProfileLoading: false })
        }

    },

    getProfilesByUserId: async (id) => {

        try {

            set({ isProfileLoading: true })
            const res = await axiosInstance(`/admin/get-user-profiles-byUserId/${id}`);

            if (res.data.userProfilesList.length === 0) {
                toast.error("No Biodata found \n Please Add Profiles ⚠️");
                set({ isProfileLoading: false })
            }
            else {
                console.log("Biodata Fetched for User Sucessfully", res.data);
                toast.dismiss();
                toast.success("Biodata Fetched for User Sucessfully");
                set({ profilesByUserId: res.data.userProfilesList });
            }


        } catch (error) {
            console.log("Error getting Biodata by Users", error);
            toast.dismiss();
            toast.error("Error in Getting Biodata by Users");

        }
        finally {
            set({ isProfileLoading: false })
        }

    },



    getuserDataById: async (id) => {
        try {
            console.log(`ID:::${id}`);
            set({ isUserLoading: true })
            const res = await axiosInstance.get(`/profile/get-user-by-UserId/${id}`);
            set({ user: res.data.User });
            //toast.success(res.data.message);
            console.log("Data User by id:::", res.data.User);
        } catch (error) {
            console.log("Error getting User by id", error);
            toast.error("Error in Getting User");

        }
        finally {
            set({ isUserLoading: false })
        }

    },

})); 
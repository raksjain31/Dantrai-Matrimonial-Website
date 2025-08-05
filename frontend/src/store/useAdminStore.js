import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";




export const useAdminStore = create((set) => ({
    users: [],
    user: null,
    userApprovedPending: [],
    usercount: null,
    allProfilecount: null,
    userApprovedCount: null,
    userApprovedPendingCount: null,
    profileFemalecount: null,
    profileMalecount: null,


    isUsersApprovalPendingLoading: false,
    isUserLoading: false,

    getAllUsersDetails: async () => {

        try {

            set({ isUsersLoading: true })

            const res = await axiosInstance.get("/admin/get-alluser-details");

            set({ users: res.data.users });
        } catch (error) {
            console.log("Error getting all Users", error);
            toast.error("Error in Getting All Users")

        }

        finally {
            set({ isUsersLoading: false })
        }

    },

    getAllPendingApproval: async () => {

        try {

            set({ isUsersApprovalPendingLoading: true })

            const res = await axiosInstance.get("/admin/get-users-pendingapproval");

            console.log("backend data:", res.data.users);
            set({ userApprovedPending: res.data.users });



        } catch (error) {
            console.log("Error getting all Approval Pending Users", error);
            toast.error("Error in Getting All Approval Pending Users")

        }

        finally {
            set({ isUsersApprovalPendingLoading: false })
        }

    },

    getAllUserCount: async () => {
        try {

            set({ isUsersApprovalPendingLoading: true })
            const res = await axiosInstance.get("/admin/get-Allcounts");
            set({ usercount: res.data.totaluserCount });
            set({ allProfilecount: res.data.totalProfiles });
            set({ userApprovedCount: res.data.totalApprovedUsers });
            set({ userApprovedPendingCount: res.data.totalApprovalPendingUsers });
            set({ profileFemalecount: res.data.totalFemaleProfiles });
            set({ profileMalecount: res.data.totalMaleProfiles });

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error getting Users Count", error);
            toast.error("Error in getting Users Count");

        }
        finally {
            set({ isUsersApprovalPendingLoading: false })
        }

    },

    getProfileByUser: async () => {

        try {

            set({ isUserLoading: true })
            const res = await axiosInstance("/profile/get-profiles-by-user");


            console.log("Profile Fetched for User Sucessfully", res.data.profiles);
            toast.dismiss();
            toast.success("Profile Fetched for User Sucessfully");
            set({ profilesByUser: res.data.profiles });

        } catch (error) {
            console.log("Error getting profiles by Users", error);
            toast.dismiss();
            toast.error("Error in Getting Profile by Users");

        }
        finally {
            set({ isUserLoading: false })
        }

    },







})); 
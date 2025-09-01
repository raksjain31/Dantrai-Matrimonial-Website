import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";




export const useActions = create((set) => ({
    isDeletingProfile: false,
    isUpdatingUser: false,
    isUpdatingUserPending: false,
    isUpdateRejectingUser: false,
    isDeletingUser: false,

    onDeleteProfile: async (id) => {
        try {

            set({ isDeletingProfile: true });
            const res = await axiosInstance.delete(`/profile/delete-profile/${id}`);
            toast.success(res.data.message);


        } catch (error) {
            console.log("Error deleting profile", error);
            toast.error("Error deleting profile");

        }
        finally {
            set({ isDeletingProfile: false });
        }


    },
    onDeleteUser: async (id) => {
        try {

            set({ isDeletingUser: true });
            const res = await axiosInstance.delete(`/auth/delete-user/${id}`);
            toast.success(res.data.message);


        } catch (error) {
            console.log("Error deleting user", error);
            toast.error("Error deleting user");

        }
        finally {
            set({ isDeletingUser: false });
        }


    },

    onUpdateUser: async (id) => {
        try {

            set({ isUpdatingUser: true });
            const res = await axiosInstance.put(`/admin/approved-user-by-id/${id}`);
            toast.success(res.data.message);


        } catch (error) {
            console.log("Error Updating User", error);
            toast.error("Error Updating User");

        }
        finally {
            set({ isUpdatingUser: false });
        }


    },


    onUpdatePendingUser: async (id) => {
        try {

            set({ isUpdatingUserPending: true });
            const res = await axiosInstance.put(`/admin/pending-user-by-id/${id}`);
            toast.success(res.data.message);


        } catch (error) {
            console.log("Error Updating Pending User", error);
            toast.error("Error Updating Pending User");

        }
        finally {
            set({ isUpdatingUserPending: false });
        }


    },


    onUpdateRejectingUser: async (id) => {
        try {

            set({ isUpdateRejectingUser: true });
            const res = await axiosInstance.put(`/admin/reject-user-by-id/${id}`);
            toast.success(res.data.message);


        } catch (error) {
            console.log("Error Rejecting User", error);
            toast.error("Error Rejecting User");

        }
        finally {
            set({ isUpdateRejectingUser: false });
        }


    }


}))


export default useActions
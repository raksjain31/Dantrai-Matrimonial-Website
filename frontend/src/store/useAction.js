import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";




export const useActions = create((set) => ({
    isDeletingProfile: false,
    isUpdatingUser: false,

    onDeleteProfile: async (id) => {
        try {

            set({ isDeletingProblem: true });
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


    }


}))


export default useActions
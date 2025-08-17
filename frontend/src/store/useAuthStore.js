import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    isApprovedUser: false,

    isEmailVerifying: false,
    EmailVerifyforOtp: null,
    HashOtp: null,

    isResetPassword: false,
    ResetPasswordData: null,


    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("CheckAuth Response", res.data)
            set({
                authUser: res.data.user
            })


        } catch (error) {

            console.log("❌ Error CheckAuth Error", error)
            set({
                isCheckingAuth: null
            })

        }
        finally {
            set({ isCheckingAuth: false });

        }
    },

    signup: async (data) => {
        set({ isSigninUp: true });
        try {
            const res = await axiosInstance.post('/auth/register', data);

            set({ authUser: res.data.user });

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error signing up", error);
            toast.error("Error signing up");
        } finally {
            set({ isSigninUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data.user });

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });

            toast.success("Logout successful");
        } catch (error) {
            console.log("Error logging out", error);
            toast.error("Error logging out");
        }
    },


    forgetPassword: async (data) => {
        set({ isEmailVerifying: true });
        try {

            const res = await axiosInstance.post(`/auth/forget-password`, data);
            const { email, hashed } = res.data;
            console.log("Email:", res.data.hashed);
            set({ EmailVerifyforOtp: email });
            set({ HashOtp: hashed });
            toast.success(res.data.message);
            return { email, hashed };
        } catch (error) {
            console.log("Error sending Otp", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isEmailVerifying: false });
        }

    }, //passowrd



    ResetPassword: async (data) => {
        set({ isResetPassword: true });
        try {
            console.log("is data getting hash:", data)
            const res = await axiosInstance.post(`/auth/reset-password/${data.email}/${data.hashed}`, data);
            console.log("EmailRes:", res);
            set({ ResetPasswordData: res.data.user_verfiytoken });

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error Reset Password", error);
            toast.error("Error Reset Password");
        } finally {
            set({ isResetPassword: false });
        }

    },

}))
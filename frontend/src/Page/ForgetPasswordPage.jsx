import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { User, Code, Code2, Eye, EyeOff, Loader2, Lock, Mail, User2, PhoneCall } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import Toast from "react-hot-toast";


import { useParams } from 'react-router-dom';


const forgetpasswordschema = z.object({

    email: z.string().email("Enter a valid email").transform((str) => str.toLowerCase()),

})



const ForgetPasswordPage = () => {
    const navigation = useNavigate();
    const { forgetPassword, EmailVerifyforOtp, HashOtp, isEmailVerifying } = useAuthStore()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }

    } = useForm({
        resolver: zodResolver(forgetpasswordschema)
    })








    const onSubmit = async (data) => {
        //console.log(data);
        try {
            // console.log("Hashotppp:", HashOtp)
            // console.log("Forget Password data", data);
            const res = await forgetPassword(data)
            if (res?.email && res?.hashed) {
                navigation(`/reset-password/${res.email}/${res.hashed}`);
            }


        } catch (error) {
            console.log("Otp Failed", error);
        }

    }

    return (
        <div className='h-screen grid lg:grid-cols-1'>
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-sm space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <User2 className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Enter Your Email </h1>
                            <p className="text-base-content/60">For Password Reset</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">



                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={`input - bordered w - full pl - 10 ${errors.email ? "input-error" : ""
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>





                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isEmailVerifying}
                        >
                            {isEmailVerifying ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Send OTP"

                            )}
                        </button>
                    </form>



                </div>
            </div >


        </div >

    )
}

export default ForgetPasswordPage
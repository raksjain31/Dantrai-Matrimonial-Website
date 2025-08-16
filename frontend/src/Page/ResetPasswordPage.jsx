import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ListOrdered, Loader2, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';


const ResetPasswordschema = z.object({

    password: z.string().min(8, "Password must be at least 8 characters long"),
    otp: z
        .string()
        .trim()
        .length(6, { message: "OTP must be exactly 6 digits" })
        .regex(/^\d{6}$/, { message: "OTP must contain only digits" })



})



const ResetPasswordPage = () => {
    const location = useLocation();
    const { email, token } = useParams();
    const navigation = useNavigate();
    const { ResetPassword, ResetPasswordData, isResetPassword } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }

    } = useForm({
        resolver: zodResolver(ResetPasswordschema)
    })




    // React.useEffect(() => {


    //     if (token) {
    //         ResetPassword(token);

    //     }


    // }, [token]);



    const onSubmit = async (data) => {
        //console.log(data);
        try {

            ResetPassword({
                email,
                hashed: token,
                password: data.password,
            });
            navigation(`/login`);

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

                            <h1 className="text-2xl font-bold mt-2">Enter New Password and OTP Sent on Your Email </h1>

                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : ""
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        {/* OTP */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">One Time Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <ListOrdered className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="otp"
                                    {...register("otp")}
                                    className={`input  - bordered w - full pl - 10 ${errors.otp ? "input-error" : ""
                                        }`}
                                    placeholder="123456"
                                />
                            </div>
                            {errors.otp && (
                                <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
                            )}
                        </div>





                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isResetPassword}
                        >
                            {isResetPassword ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Submit"

                            )}
                        </button>
                    </form>



                </div>
            </div >


        </div >

    )
}

export default ResetPasswordPage
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { User, Code, Code2, Eye, EyeOff, Loader2, Lock, Mail, User2, PhoneCall } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
import { useAuthStore } from '../store/useAuthStore'


const phoneValidation = new RegExp(
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
);
const signUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").transform((str) => str.toUpperCase()),
    email: z.string().email("Enter a valid email").transform((str) => str.toLowerCase()),
    Father: z.string().min(3, "Name must be at least 3 characters long").transform((str) => str.toUpperCase()),
    phone: z.string().min(10, 'Phone number is required.').refine(value => /^\d{10}$/.test(value), 'Invalid Number!'),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    village: z.string()
})



const SignUpPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { signup, isSigninUp } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors }

    } = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = async (data) => {
        //console.log(data);
        try {
            await signup(data)
            console.log("signup data", data);

        } catch (error) {
            console.log("signup Failed", error);
        }

    }

    return (
        <div className='h-screen grid lg:grid-cols-2'>
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-sm space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <User2 className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Welcome </h1>
                            <p className="text-base-content/60">Sign Up to your account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <code className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    {...register("name")}
                                    className={`input input-bordered w-full pl- ${errors.name ? "input-error" : ""
                                        }`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        {/* Father or GrandFather */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Father</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User2 className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    {...register("Father")}
                                    className={`input input-bordered w-full pl-10 ${errors.Father ? "input-error" : ""
                                        }`}
                                    placeholder="Father / GrandFather Name"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.Father.message}</p>
                            )}
                        </div>

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
                                    className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : ""
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        {/* Phone */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Phone</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <PhoneCall className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="phone"
                                    {...register("phone")}
                                    className={`input input-bordered w-full pl-10 ${errors.phone ? "input-error" : ""
                                        }`}
                                    placeholder="1234567890"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>


                        {/* Password */}
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

                        {/* Village */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Village
                                </span>
                            </label>
                            <select
                                className="select select-bordered w-full text-base "
                                {...register("village")}
                            >

                                <option value="DANTRAI">DANTRAI</option>
                                <option value="NIMBAJ">NIMBAJ</option>
                                <option value="MALGAON">MALGAON</option>
                                <option value="AMBLARI">AMBLARI</option>
                                <option value="ANADARA">ANADARA</option>
                                <option value="MAROL">MAROL</option>
                                <option value="PAMERA">PAMERA</option>
                                <option value="DHAN">DHAN</option>
                                <option value="MADIYA">MADIYA</option>
                                <option value="MERMODAVARA">MERMODAVARA</option>

                            </select>
                            {errors.village && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.village.message}
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSigninUp}
                        >
                            {isSigninUp ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Sign In"

                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                        <p className="text-base-content/60">Developed and Design by Rakshit Rathod <br />@Darpan Software Solution </p>
                    </div>
                </div>
            </div >

            <AuthImagePattern
                title="Welcome to Abugoad Youth Connect!"
                subtitle={
                    "Sign up to access Platform and Meet Apno Ki Apno se Pehchan!"
                }

            />

        </div >

    )
}

export default SignUpPage
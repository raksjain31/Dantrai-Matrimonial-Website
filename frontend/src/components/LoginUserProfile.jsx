import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { User, Code, Code2, Eye, EyeOff, Loader2, Lock, TrashIcon, CheckCircle2, Mail, User2, PhoneCall } from 'lucide-react'

import { useAuthStore } from '../store/useAuthStore'
import { useParams } from 'react-router-dom';
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";
import { useProfileStore } from '../store/useProfileStore'
import { useNavigate } from "react-router-dom";
import useAction from '../store/useAction'

const phoneValidation = new RegExp(
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
);
const UserEditSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").transform((str) => str.toUpperCase()),
    email: z.string().email("Enter a valid email").transform((str) => str.toLowerCase()),
    Father: z.string().min(3, "Father must be at least 3 characters long").transform((str) => str.toUpperCase()),
    phone: z.string().min(10, 'Phone number is required.').refine(value => /^\d{10}$/.test(value), 'Invalid Number!'),
    village: z.string(),
    image: z



        .any()

        //.transform((file) => file.length > 0 && file.item(0), "Image is Required")
        .transform((val) => {
            // Case 1: FileList (new upload)
            if (val instanceof FileList && val.length > 0) {
                return val[0];
            }

            // Case 2: Already saved string URL (from DB)
            if (typeof val === "string") {
                return val; // keep DB image
            }

            return null;
        }),
})



const LoginUserProfile = () => {
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { id } = useParams();
    const [authUser, setAuthUser] = React.useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const { UpdateUser, isUpdatingUser } = useAuthStore();
    const { getuserDataById, user } = useProfileStore();
    const { isDeletingUser, onDeleteUser } = useAction();
    const logout = useAuthStore((state) => state.logout);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }

    } = useForm({
        resolver: zodResolver(UserEditSchema)
    })


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // create preview URL
        }
    };


    const handleDelete = async () => {
        //if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const isConfirmed = confirm("Are you sure you want to delete this User ?")
            if (isConfirmed) {
                onDeleteUser(id);
                logout();
            }
            else {
                return;
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete user");
        } finally {

        }
    };

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get(`/profile/get-user-by-UserId/${id}`);
                const fetchedUser = res.data.user;

                if (fetchedUser) {
                    reset({
                        name: fetchedUser.name || "",
                        email: fetchedUser.email || "",
                        phone: fetchedUser.phone || "",
                        village: fetchedUser.village || "",
                        Father: fetchedUser.Father || "",
                        image: fetchedUser.image
                    });
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [id, reset]);


    const imageFile = watch('image');

    const [preview, setPreview] = useState(null);

    const onSubmit = async (data) => {
        console.log("update user:", data);

        try {

            setIsLoading(true)



            const formData = new FormData();



            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('village', data.village);
            formData.append('Father', data.Father);
            formData.append('imageFile', data.image);
            // formData.append('imagePublicID', profile.imagePublicID);

            console.log("Form data:", data);
            console.log('Selected avatar image file:', data.image);         // should be a FileList
            console.log('Actual avatar file object:', data.image?.[0]);
            console.log("Submitted avatar image:", data.image);
            console.log("image avatar file:", data.image);

            // if (!file) {
            //     alert("Image file is missing!!!!");
            //     return;
            // }
            console.log("Update avatar FormData:", formData)

            const result = await axiosInstance.post(`/profile/update-user/${id}`, formData);
            setAuthUser(result.Updateuser);

            toast.success(result.data.message || "User Updated successfully⚡");
            navigation("/");
            console.log("Update User Data", data);

            setPreview(null);
            reset();

        } catch (error) {
            console.log(error);
            toast.error("Error Updating profile")

        }
        finally {
            setIsLoading(false);
        }

    }

    return (
        <div className='container mx-auto py-8 px-4 max-w-7xl'>
            <div className='h-screen grid lg:grid-cols-1'>
                <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                    <div className="w-full max-w-sm space-y-8">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <div className="flex flex-col items-center gap-2 group">
                                {/* <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <User2 className="w-6 h-6 text-primary" />
                                </div> */}

                                <p className="text-base-content/60">Edit Your Login Profile</p>
                            </div>
                        </div>

                        {/* Form */}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="form-control justify-center">
                                <div className="avatar gap-4">
                                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 ">

                                        <img src={preview || "https://avatar.iran.liara.run/public/boy"} // default placeholder
                                            alt="avatar"
                                        />
                                    </div>

                                    <input type="file" {...register("image", {
                                        onChange: (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                // use the file for preview

                                                setPreview(URL.createObjectURL(file));
                                            }
                                        },
                                    })} accept="image/*" className="file-input file-input-primary" />

                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                                )}

                            </div>
                            {/* name */}
                            <div className="form-control">


                                {/* <img
                                    src={"/logo.png"}//user?.image
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                /> */}
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
                                {errors.Father && (
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
                                        type="tel"
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
                            {/* <div className="form-control">
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
                        </div> */}

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
                                    <option value="POSINDARA">POSINDARA</option>
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
                            <div className="flex justify-between gap-4">
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-50"
                                    disabled={isUpdatingUser}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner text-white"></span>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" />
                                            Update
                                        </>
                                    )}
                                </button>


                                <button
                                    onClick={() => handleDelete()}
                                    className="btn btn-error w-50 "
                                >
                                    {isDeletingUser ? (
                                        <span className="loading loading-spinner text-white"></span>
                                    ) : (
                                        <>

                                            <TrashIcon className="w-4 h-4 text-white" />
                                            Delete User
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>



                    </div>
                </div >


            </div >

        </div >

    )
}

export default LoginUserProfile
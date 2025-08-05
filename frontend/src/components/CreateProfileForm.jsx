import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import DatePicker from 'react-datepicker';
import {
    Plus,
    Trash2,
    ImageUp,
    FileText,
    Lightbulb,
    BookOpen,
    CheckCircle2,
    Download,
    Briefcase,
    GraduationCap, House
} from "lucide-react";

import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';


const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 21);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

function toUTCDateOnly(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}




const profileSchema = z.object({
    fullname: z.string().min(3, "Full Name must be at least 3 characters").transform((str) => str.toUpperCase()),

    gender: z.enum(["MALE", "FEMALE"]),
    dateOfBirth: z

        .date({
            required_error: 'Date of birth is required.',
            invalid_type_error: 'Invalid date format.',
        }).max(new Date(), {
            message: 'Date of birth cannot be in the future.',
        }).refine((date) => date <= eighteenYearsAgo, {
            message: "Member must be at least 21 years old."
        }),
    age: z.coerce.number().min(21, { message: "Age must be at least 21." })
        .positive("Age must be a positive number"),
    height: z.string(),
    currentLiveCity: z.string(),
    phone: z.string().min(10, 'Phone number is required.').refine(value => /^\d{10}$/.test(value), 'Invalid Number!'),
    image: z


        // .refine(
        //     (file) => !file || file.size !== 0 || file.size <= MAX_UPLOAD_SIZE,
        //     `Max 5MB allowed`
        // )
        // .refine(
        //     (file) =>
        //         !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        //     "Only .jpg, .jpeg, and .png formats are supported"
        // ),
        .any()

        .transform((file) => file.length > 0 && file.item(0), "Image is Required")
        .refine((files) => !files[0]?.size <= 5 * 1024 * 1024, {
            message: "Image must be less than or equal to 5MB",
        }),

    // .refine(
    //     (File) => ACCEPTED_IMAGE_TYPES.includes(File?.[0]?.type),
    //     'Only JPG,JPEG, PNG, WEBP formats are supported'
    // )


    aboutme: z.string().max(250, "About Me at most 250 characters").transform((str) => str.toUpperCase()),
    education: z.string().min(3, "Education at most 3 characters").transform((str) => str.toUpperCase()),
    college: z.string().min(3, "College at most 3 characters").transform((str) => str.toUpperCase()),
    aboutmyeducation: z.string().max(250, "About My Education at most 250 characters").transform((str) => str.toUpperCase()),
    employedIn: z.enum(["PRIVATE", "GOVT", "BUSINESS"]),
    occupation: z.string().min(3, "Occupation  must be atleast 3 characters").transform((str) => str.toUpperCase()),
    organisation: z.string().min(3, "Organisation  must be atleast 3 characters").transform((str) => str.toUpperCase()),
    aboutmycareer: z.string().max(250, "About My Career at most 250 characters").transform((str) => str.toUpperCase()),
    father: z.string().min(3, "Father Name must be atleast 3 characters").transform((str) => str.toUpperCase()),
    mother: z.string().min(3, "Mother Name must be atleast 3 characters").transform((str) => str.toUpperCase()),
    noOfBrothers: z.coerce.number().int("No of Brothers must be an integer"),
    // .positive("Number of Brothers must be a positive number"),
    noOfMarriedBrothers: z.coerce.number().int("No of Brothers must be an integer"),
    //.positive("Number of Brothers must be a positive number")
    noOfsisters: z.coerce.number().int("No of Sisters must be an integer"),
    //.positive("Number of Sisters must be a positive number")
    noOfMarriedSisters: z.coerce.number().int("No of Sisters must be an integer"),
    //.positive("Number of Sisters must be a positive number")
    aboutmyfamily: z.string().max(250, "About My Family at most 250 characters").transform((str) => str.toUpperCase()),
    hobbies: z.string()//.min(3, "Hobbies Name must be atleast 3 characters").transform((str) => str.toUpperCase())


});





const CreateProfileForm = () => {
    //const [sampleType, setSampleType] = useState("DP")
    const navigation = useNavigate();
    const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm(
        {
            resolver: zodResolver(profileSchema),
        }
    )
    // Watch for image file changes
    const imageFile = watch('image');

    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [age, setAge] = useState(null);
    const [dob, setDob] = useState(null);
    const handleDateChange = (date) => {
        setDob(date);
        if (date) {
            const calculatedAge = calculateAge(date);
            setAge(calculatedAge);
        }
    };
    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    }

    React.useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            // Clean up preview when component unmounts or new file selected
            return () => URL.revokeObjectURL(previewUrl);
        } else {
            setPreview(null);
        }
    }, [imageFile]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)


            const cleanDate = toUTCDateOnly(data.dateOfBirth);



            const formData = new FormData();



            formData.append('fullname', data.fullname);
            formData.append('gender', data.gender);

            formData.append("dateOfBirth", cleanDate.toISOString());
            formData.append('age', parseInt({ age }));
            formData.append('height', data.height);
            formData.append('currentLiveCity', data.currentLiveCity);
            formData.append('phone', data.phone);
            formData.append('imageFile', data.image);




            formData.append('aboutme', data.aboutme);
            formData.append('education', data.education);
            formData.append('college', data.college);
            formData.append('aboutmyeducation', data.aboutmyeducation);
            formData.append('employedIn', data.employedIn);
            formData.append('occupation', data.occupation);
            formData.append('organisation', data.organisation);
            formData.append('aboutmycareer', data.aboutmycareer);
            formData.append('father', data.father);
            formData.append('mother', data.mother);




            formData.append('noOfBrothers', parseInt(data.noOfBrothers));
            formData.append('noOfMarriedBrothers', parseInt(data.noOfMarriedBrothers));
            formData.append('noOfsisters', parseInt(data.noOfsisters));
            formData.append('noOfMarriedSisters', parseInt(data.noOfMarriedSisters));
            formData.append('aboutmyfamily', data.aboutmyfamily);
            formData.append('hobbies', data.hobbies);

            console.log("Form data:", data);
            console.log('Selected image file:', data.image);         // should be a FileList
            console.log('Actual file object:', data.image?.[0]);
            console.log("Submitted image:", data.image);
            console.log("image file:", data.image);

            // if (!file) {
            //     alert("Image file is missing!!!!");
            //     return;
            // }
            const res = await axiosInstance.post("/profile/create-profile", formData);
            console.log(res.data);
            toast.success(res.data.message || "Profile Created successfully⚡");
            navigation("/");
            setPreview(null);
            reset();

        } catch (error) {
            console.log(error);
            toast.error("Error creating profile")

        }
        finally {
            setIsLoading(false);
        }
    }




    // Watch the date of birth field
    const selectedDate = watch('dateofBirth'); // Watch the date of birth field
    React.useEffect(() => {
        if (selectedDate) {
            setAge(calculateAge(selectedDate));
        } else {
            setAge(null);
        }
    }, [selectedDate]);


    return (
        <div className='container mx-auto py-8 px-4 max-w-7xl'>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
                        <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
                            <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                            Create Profile
                        </h2>


                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
                        {/* Basic Information */}
                        <div className="card bg-base-200 p-4 md:p-7 shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-warning" />
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control md:col-span-3">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Full Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("fullname")}
                                        placeholder="Name            Father/Gaurdian             Surname"
                                    />
                                    {errors.fullname && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.fullname.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
                                <div className="form-control md:col-span-2"> </div>
                                <div className="form-control">
                                    <label className="label" >
                                        <span className="label-text text-base md:text-lg font-semibold ">
                                            Gender
                                        </span>
                                    </label>
                                    <select
                                        className=" select select-bordered max-w-full text-base md:text-lg "
                                        {...register("gender")}
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                    {errors.gender && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.gender.message}
                                            </span>
                                        </label>
                                    )}
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Date Of Birth
                                        </span>
                                    </label>


                                    <Controller
                                        control={control}
                                        name="dateOfBirth"
                                        render={({ field }) => (

                                            <DatePicker width="100%"
                                                className="select select-bordered text-base md:text-lg birthdate border-2  placeholder-gray-500 rounded-1xl w-full width-full    outline-none"
                                                name="dateOfBirth"
                                                placeholderText="1999-01-25"
                                                selected={dob}

                                                dateFormat="yyyy-MM-dd"
                                                onChange={(date) => {
                                                    field.onChange(date);
                                                    setValue("age", calculateAge(date));
                                                    handleDateChange(date);
                                                }}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                closeOnScroll={true}
                                                disabledKeyboardNavigation
                                            />
                                        )}
                                    />

                                    {/* <DatePicker
                                        className="select select-bordered text-base md:text-lg birthdate border-2  placeholder-gray-500 rounded-1xl w-full width-full    outline-none"

                                        selected={dob}

                                        name="dateOfBirth"
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select DOB"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        closeOnScroll={true}
                                        disabledKeyboardNavigation
                                    //className="input input-bordered w-full"
                                    /> */}

                                    {errors.dateOfBirth && (
                                        <p className="text-red-600 text-sm cursor-default">
                                            {errors.dateOfBirth.message}
                                        </p>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Age (Age will Display Auto)
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={age}
                                        className="input input-bordered w-full text-base md:text-lg"

                                        {...control.register('age')} // Register the age input
                                        placeholder="Age"

                                    />
                                    {errors.age && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.age.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Height
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("height")}
                                        placeholder="Ex - 5.0'"
                                    />
                                    {errors.height && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.height.message}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Current City Live In
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("currentLiveCity")}
                                        placeholder="Ex - Mumbai"
                                    />
                                    {errors.currentLiveCity && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.currentLiveCity.message}
                                            </span>
                                        </label>
                                    )}
                                </div>



                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Phone Number
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("phone")}
                                        placeholder="10-Digit Mobile No"
                                    />
                                    {errors.phone && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.phone.message}
                                            </span>
                                        </label>
                                    )}
                                </div>



                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Hobbies(Optional)
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("hobbies")}
                                        placeholder="Hobbies"
                                    />
                                    {errors.hobbies && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.hobbies.message}
                                            </span>
                                        </label>
                                    )}
                                </div>




                            </div>



                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text text-base md:text-lg font-semibold">
                                        About YourSelf(Optional)
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                                    {...register("aboutme")}
                                    placeholder="Tell About Yourself..."
                                />

                                {errors.aboutme && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.aboutme.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                        </div>


                        {/* IMAGE */}
                        <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                                <ImageUp className="w-5 h-5 text-warning" />
                                Profile Photo Upload
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 ">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Photo (Image)
                                        </span>
                                    </label>

                                    <div id="file" style={{ display: "none" }}>
                                        Choose File

                                    </div>
                                    <div className="mb-6">


                                        <input type="file" {...register("image", {
                                            onChange: (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    // use the file for preview
                                                    setPreview(URL.createObjectURL(file));
                                                }
                                            },
                                        })} accept="image/*" className="file-input file-input-primary" />
                                        {errors.image && <p>{errors.image.message}</p>}

                                        {/* {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover" />} */}
                                        {/* <input type="file" {...register('image')} name="image" accept="image/*"
                                            onChange={(e) => {
                                                const fileList = e.target.files;
                                                if (fileList && fileList.length > 0) {
                                                    const file = fileList[0];
                                                    setPreview(URL.createObjectURL(file));
                                                    setValue("image", fileList, { shouldValidate: true }); // ✅ push file into form manually
                                                }
                                            }} className="w-full border border-gray-300 py-2 pl-3 rounded mt-0 outline-none" /> */}

                                        {/* <input
                                            type="file"
                                            accept="image/*"
                                            name="imageFile"
                                            {...register("image")}
                                            onChange={(e) => {
                                                const fileList = e.target.files;
                                                if (fileList && fileList.length > 0) {
                                                    const file = fileList[0];
                                                    setPreview(URL.createObjectURL(file));
                                                    setValue("image", fileList, { shouldValidate: true }); // ✅ push file into form manually
                                                }
                                            }}
                                        /> */}

                                        {errors.image && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">
                                                    {errors.image.message}

                                                </span>
                                            </label>
                                        )}
                                    </div>
                                </div>



                                {/* 👁️ Image Preview */}
                                {/* {preview && <img src={preview} alt="Preview" width={150} height={150} />} */}
                                <div>
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Preview
                                        </span>
                                    </label>
                                    {preview && (
                                        <div style={{ marginTop: '10px' }}>

                                            <img src={preview} alt="Preview" style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }} />
                                        </div>
                                    )}
                                </div>




                            </div>
                        </div>


                        {/* Education */}
                        <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-warning" />
                                Education Information
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 ">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Education(Highest Degree)
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("education")}
                                        placeholder="Ex - B.Com, B.Tech,CA etc......."
                                    />
                                    {errors.education && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.education.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            School/College
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("college")}
                                        placeholder="School/College Name......."
                                    />
                                    {errors.college && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.college.message}
                                            </span>
                                        </label>
                                    )}
                                </div>




                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base md:text-lg font-semibold">
                                        About My Education(Optional)
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                                    {...register("aboutmyeducation")}
                                    placeholder="Tell About Your Education in 250 words..."
                                />
                                {errors.aboutmyeducation && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.aboutmyeducation.message}
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>


                        {/* Career */}
                        <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-warning" />
                                Career Information
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-6  ">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Employed In
                                        </span>
                                    </label>
                                    <select
                                        className=" select select-bordered max-w-full text-base md:text-lg"
                                        {...register("employedIn")}
                                    >
                                        <option value="PRIVATE">PRIVATE</option>
                                        <option value="GOVT">GOVT</option>
                                        <option value="BUSINESS">BUSINESS</option>
                                    </select>
                                    {errors.employedIn && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.employedIn.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Occupation
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("occupation")}
                                        placeholder="Artist, Broker,Engineer, Doctor, Teacher, etc......."
                                    />
                                    {errors.occupation && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.occupation.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Organisation
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("organisation")}
                                        placeholder="Company / Bussiness Firm Name......."
                                    />
                                    {errors.organisation && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.organisation.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            About My Career(Optional)
                                        </span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                                        {...register("aboutmycareer")}
                                        placeholder="Tell About Your Career in 250 words..."
                                    />
                                    {errors.aboutmycareer && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.aboutmycareer.message}
                                            </span>
                                        </label>
                                    )}
                                </div>



                            </div>
                        </div>

                        {/*Family Information */}
                        <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                                <House className="w-5 h-5 text-warning" />
                                Family Information
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 ">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Father
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("father")}
                                        placeholder="Father Full Name......."
                                    />
                                    {errors.father && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.father.message}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            Mother
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("mother")}
                                        placeholder="Mother Full Name......."
                                    />
                                    {errors.mother && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.mother.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            No of Brothers
                                        </span>
                                    </label>
                                    <input
                                        type="int"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("noOfBrothers", { valueAsNumber: true })}
                                        placeholder="1,2,3......."
                                    />
                                    {errors.noOfBrothers && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.noOfBrothers.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            No of Married Brothers
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("noOfMarriedBrothers", { valueAsNumber: true })}
                                        placeholder="0,1,2,3......."
                                    />
                                    {errors.noOfMarriedBrothers && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.noOfMarriedBrothers.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            No of Sisters
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("noOfsisters", { valueAsNumber: true })}
                                        placeholder="0,1,2,3......."
                                    />
                                    {errors.noOfsisters && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.noOfsisters.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base md:text-lg font-semibold">
                                            No of Married Sisters
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full text-base md:text-lg"
                                        {...register("noOfMarriedSisters", { valueAsNumber: true })}
                                        placeholder="0,1,2,3......."
                                    />
                                    {errors.noOfMarriedSisters && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.noOfMarriedSisters.message}
                                            </span>
                                        </label>
                                    )}
                                </div>




                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base md:text-lg font-semibold">
                                        About My Family(Optional)
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                                    {...register("aboutmyfamily")}
                                    placeholder="Tell About Your Family in 250 words..."
                                />
                                {errors.aboutmyfamily && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.aboutmyfamily.message}
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>





                        <div className="card-actions justify-end pt-4 border-t">
                            <button type="submit" className="btn btn-primary btn-lg gap-2">
                                {isLoading ? (
                                    <span className="loading loading-spinner text-white"></span>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Create Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}



export default CreateProfileForm
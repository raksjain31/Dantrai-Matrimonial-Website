import { db } from "../libs/db.js";

import dotenv from "dotenv";


import cloudinary from "../Utils/cloudinary.js";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
export const createProfile = async (req, res) => {

    let result = null;
    try {

        console.log("File from multer:", req.file);
        console.log("File Path from multer:", req.file.path);
        const { fullname, gender, dateOfBirth, age, height, currentLiveCity, phone, image,
            aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
            aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
            noOfMarriedSisters, aboutmyfamily, hobbies } = req.body;


        const file = req.file.path;


        console.log('Received fields:', req.body);
        console.log('Received file:', req.file);
        console.log('Received file Paths:', req.file.path);


        if (!file) {
            return res.status(400).json({ error: 'Image is required file empty' });
        }

        //Working for cloudinary save File
        result = await cloudinary.uploader.upload(req.file.path, (error, result) => {
            folder: 'user_profiles'
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image",
                })
            }
            else {
                console.log('Image uploaded successfully!');

                // console.log('Image URL:', result.secure_url);
            }



        })

        console.log("Backend Image Public ID:", result.public_id);
        const newprofile = await db.Profile.create({
            data: {
                fullname, gender, dateOfBirth, age: parseInt(age), height, currentLiveCity, phone,
                image: result.secure_url, imagePublicID: result.public_id,
                aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
                aboutmycareer, father, mother,
                noOfBrothers: parseInt(noOfBrothers),
                noOfsisters: parseInt(noOfsisters),
                noOfMarriedBrothers: parseInt(noOfMarriedBrothers),
                noOfMarriedSisters: parseInt(noOfMarriedSisters),
                aboutmyfamily, hobbies, userId: req.user.id
            }


        });





        return res.status(201).json(newprofile);

    }



    catch (error) {

        if (result?.public_id) {
            try {
                await cloudinary.uploader.destroy(result.public_id);
                console.log("Rolled back image:", result.public_id);
            } catch (delErr) {
                console.error("Error deleting image from Cloudinary:", delErr);
            }
        }

        console.log(error);
        return res.status(500).json({
            error: "Error creating Profile",
        });

    }



}





export const getAllProfile = async (req, res) => {

    try {


        const profiles = await db.profile.findMany({


            select: {
                id: true,
                fullname: true,
                gender: true,
                dateOfBirth: true,
                age: true,
                height: true,
                currentLiveCity: true,
                phone: true,
                education: true,
                currentLiveCity: true,
                father: true,
                mother: true,
                user: {
                    select: {
                        village: true,
                        Father: true
                    }
                }
            }


        });

        if (!profiles) {

            return res.status(404).json({
                message: "No Profiles Found"
            })

        }

        res.status(200).json({
            sucess: true,
            message: "Profiles Fetched Successfully",
            profiles
        });



    } catch (error) {

        console.log(error);
        return res.status(500).json({
            error: "Error while Fetching All Profiles",
        });


    }



}

export const getProfileById = async (req, res) => {
    const { id } = req.params;

    console.log(`Profile by Id :${id}`)
    try {
        const profile = await db.profile.findUnique(
            {
                where: {
                    id
                }
            });


        if (!profile) {
            return res.status(404).json({
                error: "Profile Not Found!"
            })
        }

        res.status(200).json({
            sucess: true,
            message: "Profile Fetched Successfully",
            profile
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while Fetching Profile by ID  ",
        });



    }


}

export const updateProfilebyId = async (req, res) => {
    let result = null;
    try {
        const { id } = req.params;
        const file = req.file.path;

        const { fullname, gender, dateOfBirth, age, height, currentLiveCity, phone, image,
            aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
            aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
            noOfMarriedSisters, aboutmyfamily, hobbies } = req.body;

        // if (req.user.isApproved == false) {
        //     return res.status(403).json({
        //         message: "Access Denied- Approved Users only"
        //     })
        // }

        if (!file) {
            return res.status(400).json({ error: 'Image is required file empty' });
        }

        //Working for cloudinary save File
        result = await cloudinary.uploader.upload(req.file.path, (error, result) => {
            folder: 'user_profiles'
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image",
                })
            }
            else {
                console.log('Image uploaded successfully!');

                // console.log('Image URL:', result.secure_url);
            }

        })

        console.log("Backend ID:", id);
        console.log("Backend UserID:", req.user.id);

        console.log("Backend Image Public ID:", result.public_id);

        const Updateprofile = await db.profile.update({
            where: {
                id: id,
                userId: req.user.id
            },
            data: {
                fullname, gender, dateOfBirth, age: parseInt(age), height, currentLiveCity, phone, image: result.secure_url, imagePublicID: result.public_id,
                aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
                aboutmycareer, father, mother,
                noOfBrothers: parseInt(noOfBrothers),
                noOfsisters: parseInt(noOfsisters),
                noOfMarriedBrothers: parseInt(noOfMarriedBrothers),
                noOfMarriedSisters: parseInt(noOfMarriedSisters),
                aboutmyfamily, hobbies
            },


        });
        console.log('Profile updated:', Updateprofile);
        //return Updateprofile;
        return res.status(201).json(Updateprofile);

    } catch (error) {
        console.log(error);
        console.log("Rolled back image:", result.public_id);
        if (result?.public_id) {
            try {
                await cloudinary.uploader.destroy(result.public_id);
                console.log("Rolled back image:", result.public_id);
            } catch (delErr) {
                console.error("Error deleting image from Cloudinary:", delErr);
            }
        }
        return res.status(500).json({
            error: "Error Updating Profile",
        });

    }

}

export const deleteProfileById = async (req, res) => {

    try {
        const { id } = req.params;

        const Findprofile = await db.Profile.findUnique({
            where: {
                id: id,
                userId: req.user.id
            }
        });




        console.log(" Findprofile:", Findprofile)
        if (!Findprofile) {
            return res.status(404).json({
                error: "Profile Not Found!"
            })
        }

        // //console.log("Findprofile public_id:", Findprofile.imagePublicID)
        // if (Findprofile.imagePublicID) {

        //     try {
        //         await cloudinary.uploader.destroy(Findprofile.imagePublicID);

        //     } catch (delErr) {
        //         console.error("Error deleting image from Cloudinary:", delErr);
        //     }


        // }

        const Deleteprofile = await db.profile.delete({
            where: {
                id: id,
                userId: req.user.id
            }
        });


        if (Deleteprofile) {

            try {
                await cloudinary.uploader.destroy(Findprofile.imagePublicID);

            } catch (delErr) {
                console.error("Error deleting image from Cloudinary:", delErr);
            }


        }

        res.status(200).json({
            sucess: true,
            message: "Profile Deleted Successfully",
        });

        console.log(" Message isdeletedprofile:", Deleteprofile)
        if (Deleteprofile) {

            const profiles = await db.Profile.findMany({
                where: {
                    userId: req.user.id
                }
            });
            console.log(" Profiles after delete:", profiles)

            if (profiles.length == 0) {

                //if no profiles found then isApproved is set to false
                await db.User.update({
                    where: {
                        id: req.user.id
                    },
                    data: {
                        IsApproved: false
                    }
                });



            }
        }



    } catch (error) {

        console.log(error);
        return res.status(500).json({
            error: "Error Deleting Profile",
        });


    }

}

export const getProfilesByUserId = async (req, res) => {

    try {

        const profiles = await db.Profile.findMany({
            where: {
                userId: req.user.id
            }
        });


        if (!profiles) {

            return res.status(404).json({
                message: "No Profiles Found for this User"
            })
        }
        res.status(200).json({
            sucess: true,
            message: "Profile Fetched Successfully",
            profiles
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error Fetching User Specific Profiles",
        });

    }



}


export const getUserProfileByUserId = async (req, res) => {
    const { id } = req.params;

    console.log(`User Id :${id}`)
    try {
        const User = await db.user.findUnique(
            {
                where: {
                    id
                }
            });


        if (!User) {
            return res.status(404).json({
                error: "User Not Found!"
            })
        }

        res.status(200).json({
            sucess: true,
            message: "User Fetched Successfully",
            User
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while Fetching User Data  ",
        });



    }


}
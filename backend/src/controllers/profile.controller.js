import { db } from "../libs/db.js";

import dotenv from "dotenv";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
    let ImageUrl = null;
    let ImagePublicId = null;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    try {

        // console.log("File from multer:", req.file);
        // console.log("File Path from multer:", req.file.path);
        const { fullname, gender, dateOfBirth, age, height, currentLiveCity, phone, image, imagePublicID,
            aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
            aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
            noOfMarriedSisters, aboutmyfamily, hobbies } = req.body;


        const file = req.file ? req.file.path : null;


        console.log('Received fields:', req.body);
        console.log('Received file:', req.file);
        //console.log('Received file Paths:', req.file.path);

        let biodataImagePath = image;

        if (req.file) {
            // delete old image if exists
            if (biodataImagePath) {
                const oldPath = path.join(__dirname, "..", biodataImagePath);

                console.log("Oldfile path:", oldPath)
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            biodataImagePath = `/uploads/${req.file.filename}`;
        }
        // if (!file) {
        //     return res.status(400).json({ error: 'Image is required file empty' });
        // }

        // if (file) {
        //     //Working for cloudinary save File
        //     result = await cloudinary.uploader.upload(req.file.path, (error, result) => {
        //         folder: 'user_profiles'
        //         if (error) {
        //             console.log(error);
        //             return res.status(500).json({
        //                 success: false,
        //                 message: "Error uploading image",
        //             })
        //         }
        //         else {
        //             ImageUrl = result.secure_url;
        //             ImagePublicId = result.public_id;
        //             console.log('Image uploaded successfully!');

        //             // console.log('Image URL:', result.secure_url);
        //         }



        //     })

        // }
        // else {
        //     console.log('Image File not found !');
        // }



        //console.log("Backend Image Public ID:", result.public_id);
        // // imagePublicID: ImagePublicId,
        const newprofile = await db.Profile.create({
            data: {
                fullname, gender, dateOfBirth, age: parseInt(age), height, currentLiveCity, phone,
                image: biodataImagePath,
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

        // if (result?.public_id) {
        //     try {
        //         await cloudinary.uploader.destroy(result.public_id);
        //         console.log("Rolled back image:", result.public_id);
        //     } catch (delErr) {
        //         console.error("Error deleting image from Cloudinary:", delErr);
        //     }
        // }

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
        //const file = req.file.path;


        const { fullname, gender, dateOfBirth, age, height, currentLiveCity, phone, image, imagePublicID,
            aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
            aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
            noOfMarriedSisters, aboutmyfamily, hobbies } = req.body;

        // if (req.user.isApproved == false) {
        //     return res.status(403).json({
        //         message: "Access Denied- Approved Users only"
        //     })
        // }




        const oldUserImage = await prisma.profile.findUnique({
            where: { id: id },
        });


        let oldimageUrl = image;
        // let oldimagePublicId = imagePublicID

        // console.log("Backend Image old Public ID:", imagePublicID);

        //const oldprofileImage_publicID = imagePublicID
        // if (!file) {
        //     return res.status(400).json({ error: 'Image is required file empty' });
        // }

        // if (req.file) {
        //     //Working for cloudinary save File
        //     result = await cloudinary.uploader.upload(req.file.path, (error, result) => {
        //         folder: 'user_profiles'
        //         if (error) {
        //             console.log(error);
        //             return res.status(500).json({
        //                 success: false,
        //                 message: "Error uploading image",
        //             })
        //         }
        //         else {
        //             console.log('Image uploaded successfully!');

        //             // console.log('Image URL:', result.secure_url);
        //         }

        //     })
        //     oldimageUrl = result.secure_url;
        //     oldimagePublicId = result.public_id


        // }


        let biodataImagePath = oldUserImage.image;
        console.log("oldurlpath:", oldUserImage.image)
        console.log("req old file path:", req.file)
        // const __filename = fileURLToPath(import.meta.url);
        // const __dirname = path.dirname(__filename);
        if (req.file) {
            // delete old image if exists
            if (biodataImagePath) {
                const oldPath = path.join(process.cwd(), "uploads", path.basename(biodataImagePath))
                //path.join(__dirname, "../", oldUserImage.image);

                console.log("Oldfile path:", oldPath)
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            biodataImagePath = `/uploads/${req.file.filename}`;
        }

        console.log("Backend ID:", id);
        console.log("Backend UserID:", req.user.id);

        //console.log("Backend Image Public ID:", oldimagePublicId);
        //image:oldimageUrl,imagePublicID: oldimagePublicId,
        const Updateprofile = await db.profile.update({
            where: {
                id: id,
                userId: req.user.id
            },
            data: {
                fullname, gender, dateOfBirth, age: parseInt(age), height, currentLiveCity, phone,
                image: biodataImagePath,
                aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
                aboutmycareer, father, mother,
                noOfBrothers: parseInt(noOfBrothers),
                noOfsisters: parseInt(noOfsisters),
                noOfMarriedBrothers: parseInt(noOfMarriedBrothers),
                noOfMarriedSisters: parseInt(noOfMarriedSisters),
                aboutmyfamily, hobbies
            },


        });

        // if (Updateprofile && oldimagePublicId != imagePublicID) {

        //     try {
        //         await cloudinary.uploader.destroy(imagePublicID);

        //     } catch (delErr) {
        //         console.error("Error deleting image from Cloudinary:", delErr);
        //     }


        // }
        // console.log('Profile updated:', Updateprofile);

        return res.status(201).json(Updateprofile);

    } catch (error) {
        console.log(error);
        // console.log("Rolled back image:", result?.public_id);
        // if (result?.public_id) {
        //     try {
        //         await cloudinary.uploader.destroy(result?.public_id);
        //         console.log("Rolled back image:", result?.public_id);
        //     } catch (delErr) {
        //         console.error("Error deleting image from Cloudinary:", delErr);
        //     }
        // }
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

        let biodataImagePath = Findprofile.image
        if (Deleteprofile) {
            try {
                if (biodataImagePath) {
                    const oldPath = path.join(process.cwd(), "uploads", path.basename(biodataImagePath))
                    //path.join(__dirname, "../", oldUserImage.image);

                    console.log("Oldfile path:", oldPath)
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }
            } catch (delErr) {
                console.error("Error deleting image from folder:", delErr);
            }


        }
        // if (Deleteprofile) {

        //     try {
        //         await cloudinary.uploader.destroy(Findprofile.imagePublicID);

        //     } catch (delErr) {
        //         console.error("Error deleting image from Cloudinary:", delErr);
        //     }


        // }

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
                        IsApproved: false,
                        IsRejected: false
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
            },
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
                        Father: true,
                        IsApproved: true,
                        IsRejected: true
                    }
                }

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

export const getUserData = async (req, res) => {
    const { id } = req.params;
    try {

        const user = await db.User.findUnique({
            where: {
                id
            }
        });


        if (!user) {

            return res.status(404).json({
                message: "No User data Found"
            })
        }
        res.status(200).json({
            sucess: true,
            message: "user Fetched Successfully",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error Fetching User ",
        });

    }



}


export const UpdateUserByUserId = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, village, Father, image } = req.body;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(`User Id :${id}`)
    try {

        let avatarPath = image;

        if (req.file) {
            // delete old image if exists
            if (avatarPath) {
                const oldPath = path.join(__dirname, "..", avatarPath);

                console.log("Oldfile path:", oldPath)
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            avatarPath = `/uploads/${req.file.filename}`;
        }

        const Updateuser = await db.User.update({
            where: {
                id: id,

            },
            data: {
                name, email, phone, village, Father, image: avatarPath
            },


        });

        res.status(200).json({
            sucess: true,
            message: "User Updated Successfully",
            Updateuser
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while Updating User Data  ",
        });



    }


}




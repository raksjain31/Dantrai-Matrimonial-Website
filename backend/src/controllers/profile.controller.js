import { db } from "../libs/db.js";
import cloudinary from "../Utils/cloudinary.js";
import dotenv from "dotenv";



dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
export const createProfile = async (req, res) => {
    try {

        console.log("File from multer:", req.file);

        const { fullname, gender, dateOfBirth, height, currentLiveCity, phone,
            aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
            aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
            noOfMarriedSisters, aboutmyfamily, hobbies } = req.body;
        //image,

        const file = req.file;


        // console.log('Received fields:', req.body);
        // console.log('Received file:', req.file);

        if (!file) {
            return res.status(400).json({ error: 'Image is required file empty' });
        }


        const result = await cloudinary.uploader.upload(req.file.path, (error, result) => {
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

                //console.log('Image URL:', result.secure_url);
            }



        })
        const newprofile = await db.Profile.create({
            data: {
                fullname, gender, dateOfBirth, height, currentLiveCity, phone, image: result.secure_url,
                aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
                aboutmycareer, father, mother,
                noOfBrothers: parseInt(noOfBrothers),
                noOfsisters: parseInt(noOfsisters),
                noOfMarriedBrothers: parseInt(noOfMarriedBrothers),
                noOfMarriedSisters: parseInt(noOfMarriedSisters),
                aboutmyfamily, hobbies, userId: req.user.id
            }


        });

        // const streamUpload = () => {
        //     return new Promise((resolve, reject) => {
        //         const stream = cloudinary.uploader.upload_stream(
        //             { folder: 'profiles' },
        //             (error, result) => {
        //                 if (result) {
        //                     resolve(result);
        //                 } else {
        //                     reject(error);
        //                 }
        //             }
        //         );
        //         streamifier.createReadStream(req.file.buffer).pipe(stream);
        //     });
        // };

        // const result = await streamUpload();

        // Save to DB



        return res.status(201).json(newprofile);

    }



    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating Profile",
        });

    }



}





export const getAllProfile = async (req, res) => {

    try {


        const profiles = await db.profile.findMany();

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

    try {
        const { id } = req.params;

        const { fullname, gender, dateOfBirth, height, currentLiveCity, phone, image,
            aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
            aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
            noOfMarriedSisters, aboutmyfamily, hobbies } = req.body;

        if (req.user.isApproved == false) {
            return res.status(403).json({
                message: "Access Denied- Approved Users only"
            })
        }


        const Updateprofile = await db.profile.update({
            where: {
                id: id,
                userId: req.user.id
            },
            data: {
                fullname, gender, dateOfBirth, height, currentLiveCity, phone, image,
                aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
                aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
                noOfMarriedSisters, aboutmyfamily, hobbies
            },


        });
        console.log('Profile updated:', Updateprofile);
        //return Updateprofile;
        return res.status(201).json(Updateprofile);

    } catch (error) {
        console.log(error);
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

        if (!Findprofile) {
            return res.status(404).json({
                error: "Profile Not Found!"
            })
        }

        await db.profile.delete({
            where: {
                id: id,
                userId: req.user.id
            }
        });

        res.status(200).json({
            sucess: true,
            message: "Profile Deleted Successfully",
        });


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
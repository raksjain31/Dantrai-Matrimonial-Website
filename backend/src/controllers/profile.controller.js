import { db } from "../libs/db.js";


export const createProfile = async (req, res) => {
    const { fullname, gender, dateOfBirth, height, currentLiveCity, phone, image,
        aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
        aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
        noOfMarriedSisters, aboutmyfamily, hobbies } = req.body;

    if (req.user.isApproved == false) {
        return res.status(403).json({
            message: "Access Denied- Approved Users only"
        })
    }


    const newprofile = await db.profile.create({
        data: {
            fullname, gender, dateOfBirth, height, currentLiveCity, phone, image,
            aboutme, education, college, aboutmyeducation, employedIn, occupation, organisation,
            aboutmycareer, father, mother, noOfBrothers, noOfsisters, noOfMarriedBrothers,
            noOfMarriedSisters, aboutmyfamily, hobbies, userId: req.user.id
        }


    });

    return res.status(201).json(newprofile);


}

export const getAllProfile = async (req, res) => {


}

export const getProfileById = async (req, res) => {


}

export const updateProfilebyId = async (req, res) => {


}

export const deleteProfileById = async (req, res) => {

}

export const getProfilesByUserId = async (req, res) => {


}
import { db } from "../libs/db.js";

export const getAllUserDetails = async (req, res) => {

    try {


        const users = await db.User.findMany();

        if (!users) {

            return res.status(404).json({
                message: "No users Found"
            })

        }

        res.status(200).json({
            sucess: true,
            message: "Users Fetched Successfully",
            users
        });



    } catch (error) {

        console.log(error);
        return res.status(500).json({
            error: "Error while Fetching All Users",
        });


    }

}

export const approvedUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { IsApproved, ApprovedbyUserId, ApprovedDate } = req.body;
        const UpdateUserApproved = await db.User.update({
            where: {
                id: id
            },
            data: {
                IsApproved: true,
                ApprovedbyUserId: req.user.id,
                ApprovedDate: new Date()
            },


        });
        console.log('Profile Approved Successfully');
        //return Updateprofile;
        return res.status(201).json(UpdateUserApproved);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error Updating Approval of User",
        });

    }


}

export const getAllUserCount = async (req, res) => {

    try {

        const userCount = await db.user.count();
        res.json({ count: userCount });



    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ error: 'Failed to fetch user count' });

    }

}



export const getAllApprovedUserCount = async (req, res) => {

    try {

        const userCount = await db.user.count({
            where: {
                IsApproved: true,
            },
        });
        res.json({ ApprovedUsercount: userCount });



    } catch (error) {
        console.error('Error fetching Approved user count:', error);
        res.status(500).json({ error: 'Failed to fetch Approved user count' });

    }
}

export const getAllMaleProfileCount = async (req, res) => {
    try {

        const ProfileMalecount = await db.profile.count({
            where: {
                gender: 'MALE',
            },
        });
        res.json({ ProfileMalecount: ProfileMalecount });



    } catch (error) {
        console.error('Error fetching Male Profile count:', error);
        res.status(500).json({ error: 'Failed to fetch Male Profile count' });

    }

}

export const getAllfemaleProfileCount = async (req, res) => {
    try {

        const ProfileFemalecount = await db.profile.count({
            where: {
                gender: 'FEMALE',
            },
        });
        res.json({ ProfileFemalecount: ProfileFemalecount });



    } catch (error) {
        console.error('Error fetching Female Profile count:', error);
        res.status(500).json({ error: 'Failed to fetch Female Profile count' });

    }


}
export const getAllProfilesCount = async (req, res) => {
    try {

        const Profilescount = await db.profile.count();
        res.json({ Profilescount: Profilescount });



    } catch (error) {
        console.error('Error fetching Profiles count:', error);
        res.status(500).json({ error: 'Failed to fetch Profiles count' });

    }

}
export const getUserProfilesListbyUserId = async (req, res) => {
    try {

        const { id } = req.params;
        const userProfilesList = await db.profile.findMany({
            where: {
                userId: id,
            },
        });
        res.json({ userProfilesList: userProfilesList });



    } catch (error) {
        console.error('Error fetching User Profiles List By UserID:', error);
        res.status(500).json({ error: 'Failed to fetch User Profiles List By UserID' });

    }

}

export const getUserProfilebyId = async (req, res) => {

    try {

        const { id } = req.params;
        const userProfilesbyId = await db.profile.findUnique({
            where: {
                id: id,
            },
        });
        res.json({ userProfilebyId: userProfilesbyId });



    } catch (error) {
        console.error('Error fetching User Profile by ID:', error);
        res.status(500).json({ error: 'Failed to fetch User Profile by ID' });

    }
}




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
        // const { IsApproved, ApprovedbyUserId, ApprovedDate } = req.body;
        const UpdateUserApproved = await db.User.update({
            where: {
                id: id
            },
            data: {
                IsApproved: true,
                ApprovedbyUserId: req.user.id,
                ApprovedDate: new Date(),
                IsRejected: false,
            },


        });
        console.log('Profile Approved Successfully');
        //return Updateprofile; 
        res.status(200).json({
            sucess: true,
            message: "User Approved Successfully",
            UpdateUserApproved
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error Updating Approval of User",
        });

    }


}

export const rejectUserById = async (req, res) => {
    try {
        const { id } = req.params;
        // const { IsApproved, ApprovedbyUserId, ApprovedDate } = req.body;
        const UpdateUserRejected = await db.User.update({
            where: {
                id: id
            },
            data: {
                IsApproved: false,
                IsRejected: true,
                RejectedbyUserId: req.user.id,
                ApprovedDate: new Date()//saved as rejection date in same column
            },


        });
        console.log('Biodata Rejected Successfully');
        //return Updateprofile; 
        res.status(200).json({
            sucess: true,
            message: "User Rejected Successfully",
            UpdateUserRejected
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error Updating Rejecting of User",
        });

    }


}


export const getAllCounts = async (req, res) => {

    try {

        const totaluserCount = await db.user.count();
        const totalProfiles = await db.profile.count();
        const totalApprovedUsers = await db.user.count({ where: { IsApproved: true } });
        const totalApprovalPendingUsers = await db.user.count({ where: { IsApproved: false } });
        const totalMaleProfiles = await db.profile.count({ where: { gender: "MALE" } });
        const totalFemaleProfiles = await db.profile.count({ where: { gender: "FEMALE" } });


        res.json({
            totaluserCount,
            totalProfiles,
            totalApprovedUsers,
            totalApprovalPendingUsers,
            totalMaleProfiles,
            totalFemaleProfiles
        });



    } catch (error) {
        console.error('Error fetching Counts:', error);
        res.status(500).json({ error: 'Failed to fetch Counts' });

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

export const getAllApprovePendingUserCount = async (req, res) => {

    try {

        const userApprovePendingCount = await db.user.count({
            where: {
                IsApproved: false,
            },
        });
        res.json({ ApprovePendingUsercount: userApprovePendingCount });



    } catch (error) {
        console.error('Error fetching Approval Pending user count:', error);
        res.status(500).json({ error: 'Failed to fetch Approval Pending user count' });

    }
}

export const getAllApprovePendingUsers = async (req, res) => {

    try {

        const users = await db.user.findMany({
            where: {
                IsApproved: false,
                IsRejected: false,
                profiles: {
                    some: {

                    }

                }
            },
        });

        // const users = await db.profile.findMany({
        //     where: {
        //         // IsApprovedProfile: false,
        //         user: {
        //             IsApproved: false,
        //             profiles: {
        //                 some: {

        //                 }

        //             }
        //         },


        //     },
        //     select: {
        //         id: true,
        //         fullname: true,
        //         gender: true,
        //         dateOfBirth: true,
        //         age: true,
        //         height: true,
        //         currentLiveCity: true,
        //         phone: true,
        //         education: true,
        //         currentLiveCity: true,
        //         father: true,
        //         mother: true,
        //         user: {

        //             select: {
        //                 name: true,
        //                 village: true,
        //                 Father: true
        //             }

        //         }
        //     }


        // });


        if (!users) {
            return res.status(404).json({
                message: "No Approval Pending Users Found"
            })
        }

        res.status(200).json({
            sucess: true,
            message: "Approval Pending Users Fetched Successfully",
            users
        });




    } catch (error) {
        console.error('Error fetching Approval Pending Users:', error);
        res.status(500).json({ error: 'Failed to fetch Approval Pending Users' });

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

        const userProfilesList = await db.Profile.findMany({
            where: {
                userId: id,
            },
        });

        if (!userProfilesList) {
            return res.status(400).json({
                error: "Problem not found."
            })

        }
        console.log(`Received ID from req.params: ${id}`);
        console.log("userProfilesList :", userProfilesList)


        res.status(200).json({
            sucess: true,
            message: "User Profiles List By UserID Fetched Successfully",
            userProfilesList
        });





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




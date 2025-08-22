import express from "express"
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import {
    approvedUserById, getAllApprovedUserCount, getAllApprovePendingUserCount, getAllApprovePendingUsers, getAllCounts, getAllfemaleProfileCount,
    getAllMaleProfileCount, getAllProfilesCount, getAllUserCount, getAllUserDetails,
    getUserProfilebyId,
    getUserProfilesListbyUserId,
    rejectUserById
} from "../controllers/admin.controller.js";



const adminRoutes = express.Router();


adminRoutes.get("/get-alluser-details", authMiddleware, checkAdmin, getAllUserDetails);

adminRoutes.put("/approved-user-by-id/:id", authMiddleware, checkAdmin, approvedUserById);

adminRoutes.put("/reject-user-by-id/:id", authMiddleware, checkAdmin, rejectUserById);

adminRoutes.get("/get-Allcounts", authMiddleware, checkAdmin, getAllCounts);

adminRoutes.get("/get-alluser-count", authMiddleware, checkAdmin, getAllUserCount);

adminRoutes.get("/get-users-pendingapproval", authMiddleware, checkAdmin, getAllApprovePendingUsers);

adminRoutes.get("/get-alluser-approved-count", authMiddleware, checkAdmin, getAllApprovedUserCount);

adminRoutes.get("/get-alluser-approve-pending-count", authMiddleware, checkAdmin, getAllApprovePendingUserCount);

adminRoutes.get("/get-all-male-profile-count", authMiddleware, checkAdmin, getAllMaleProfileCount);

adminRoutes.get("/get-all-female-profile-count", authMiddleware, checkAdmin, getAllfemaleProfileCount);

adminRoutes.get("/get-all-profiles-Count", authMiddleware, checkAdmin, getAllProfilesCount);

adminRoutes.get("/get-user-profiles-byUserId/:id", authMiddleware, checkAdmin, getUserProfilesListbyUserId);

adminRoutes.get("/get-user-profile-by-id/:id", authMiddleware, checkAdmin, getUserProfilebyId);




export default adminRoutes;
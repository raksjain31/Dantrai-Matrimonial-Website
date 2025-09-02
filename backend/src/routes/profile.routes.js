import express from "express";
import { authMiddleware, checkAdmin, checkUserApproved } from "../middleware/auth.middleware.js";
import {
    createProfile, deleteProfileById, getAllApprovedProfile, getAllProfile, getAllRejectedProfile, getFemaleProfile, getMaleProfile, getProfileById,
    getProfilesByUserId, getTotalProfile, getUserData, updateProfilebyId,
    UpdateUserByUserId
} from "../controllers/profile.controller.js";
import upload from "../middleware/multer.middleware.js";

const profileRoutes = express.Router();


profileRoutes.post("/create-profile", upload.single('imageFile'), createProfile);// authMiddleware



profileRoutes.get("/get-all-profiles", authMiddleware, checkUserApproved, getAllProfile);

profileRoutes.get("/get-all-rejected-profiles", authMiddleware, checkAdmin, getAllRejectedProfile);

profileRoutes.get("/get-total-profiles", authMiddleware, checkAdmin, getTotalProfile);

profileRoutes.get("/get-female-profiles", authMiddleware, checkAdmin, getFemaleProfile);
profileRoutes.get("/get-male-profiles", authMiddleware, checkAdmin, getMaleProfile);

profileRoutes.get("/get-Approved-biodata", authMiddleware, checkAdmin, getAllApprovedProfile);

profileRoutes.get("/get-profile/:id", authMiddleware, getProfileById);//checkUserApproved,

profileRoutes.put("/update-profile/:id", authMiddleware, upload.single('imageFile'), updateProfilebyId);

profileRoutes.delete("/delete-profile/:id", authMiddleware, deleteProfileById);//checkUserApproved,


profileRoutes.get("/get-profiles-by-user/", authMiddleware, getProfilesByUserId);


profileRoutes.get("/get-user-by-UserId/:id", authMiddleware, getUserData);


profileRoutes.post("/update-user/:id", authMiddleware, upload.single('imageFile'), UpdateUserByUserId);


export default profileRoutes;

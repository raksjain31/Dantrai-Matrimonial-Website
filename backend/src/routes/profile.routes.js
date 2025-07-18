import express from "express";
import { authMiddleware, checkUserApproved } from "../middleware/auth.middleware.js";
import { createProfile, deleteProfileById, getAllProfile, getProfileById, getProfilesByUserId, updateProfilebyId } from "../controllers/profile.controller.js";

const profileRoutes = express.Router();


profileRoutes.post("/create-profile", authMiddleware, checkUserApproved, createProfile);

profileRoutes.get("/get-all-profiles", authMiddleware, checkUserApproved, getAllProfile);


profileRoutes.get("/get-profile/:id", authMiddleware, checkUserApproved, getProfileById);

profileRoutes.put("/update-profile/:id", authMiddleware, checkUserApproved, updateProfilebyId);

profileRoutes.delete("/delete-profile/:id", authMiddleware, checkUserApproved, deleteProfileById);


profileRoutes.get("/get-profiles-by-user/", authMiddleware, checkUserApproved, getProfilesByUserId);




export default profileRoutes;

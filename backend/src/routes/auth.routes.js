import express from "express";
import { check, deleteUserbyId, forgetpassword, login, logout, register, resetpassword, updateUserbyId } from "../controllers/auth.controller.js";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();


authRoutes.post("/register", register)

authRoutes.post("/login", login)

authRoutes.post("/logout", authMiddleware, logout)

authRoutes.get("/check", authMiddleware, check)

authRoutes.post("/forget-password", forgetpassword)

authRoutes.post("/reset-password/:email/:token", resetpassword)

authRoutes.put("/update-user/:id", authMiddleware, updateUserbyId);

authRoutes.delete("/delete-user/:id", authMiddleware, deleteUserbyId);

//authRoutes.post("/reset-password", resetpassword)

export default authRoutes;
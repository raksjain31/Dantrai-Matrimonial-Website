import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - no token provided"
            })
        }


        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            return res.status(401).json({
                message: "Unauthorized - invalid token"
            })
        }


        const user = await db.User.findUnique({
            where: {
                id: decoded.id

            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                village: true,
                Father: true,
                role: true,
                IsApproved: true
                //image:true
            }
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        req.user = user;
        next();



    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "Error authenticating user" });

    }


}


export const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true
            }

        })


        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access Denied- Admin only"
            })
        }

        next();

    } catch (error) {
        console.error("Error checking admin role:", error);
        res.status(500).json({
            error: "Error checking admin role"
        })


    }

}
export const checkUserApproved = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true,
                IsApproved: true
            }

        })


        if (!user || user.IsApproved == false) {
            return res.status(403).json({
                message: "Access Denied- Approved Users only"
            })
        }

        next();

    } catch (error) {
        console.error("Error checking User IsApproved:", error);
        res.status(500).json({
            error: "Error checking IsApproved"
        })


    }

}

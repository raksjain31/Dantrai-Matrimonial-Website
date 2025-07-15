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
                role: true
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

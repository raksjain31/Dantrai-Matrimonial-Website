import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { email, password, name, phone, village, Father } = req.body;

    try {
        const existinguser = await db.User.findUnique({
            where: {
                email
            }
        })

        if (existinguser) {
            return res.status(400).json({

                error: "User already exists with this email"
            })
        }

        const existinguserphone = await db.User.findUnique({
            where: {
                phone
            }
        })

        if (existinguserphone) {
            return res.status(400).json({

                error: "User already exists with this Phone Number"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone,
                village,
                Father,
                role: UserRole.USER
            }
        })
        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"

            })

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24  //1days
        })

        return res.status(201).json({
            success: true,
            message: "User created Successfully",

            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image
            }
        })



    } catch (error) {
        console.error("Error Creating user:", error);
        return res.status(500).json({
            error: "Failed to create user"
        })

    }
}
export const login = async (req, res) => {
    const { phone, password } = req.body;//email,
    try {
        const user = await db.User.findUnique({
            where: {

                // email
                phone
                //IsApproved: true,

            }
        })

        if (!user) {

            return res.status(401).json({
                message: "User Not found"
            })

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24  //1days
        })

        return res.status(200).json({
            success: true,
            message: "User Logged in Successfully",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                Father: user.Father,
                IsApproved: user.IsApproved
                // image: user.image
            }
        })


    } catch (error) {
        console.error("Error Logged in user:", error);
        return res.status(500).json({
            error: "Error Logging in user"
        })

    }

}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt",
            {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",


            })

        res.status(200).json({
            success: true,
            message: "User Logged out Successfully"
        })


    } catch (error) {
        console.error("Error Logging out user:", error);
        return res.status(500).json({
            error: "Error Logging out user"
        })

    }


}
export const check = async (req, res) => {

    try {
        res.status(200).json({
            success: true,
            message: "User Authenticated Sucessfully",
            user: req.user
        })

    } catch (error) {
        console.error("Error Checking user:", error);
        res.status(500).json({
            error: "Error Checking user"
        })

    }
}



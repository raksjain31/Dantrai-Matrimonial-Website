import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
// import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto, { hash } from "crypto";



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
                role: 'USER'
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
        console.log("login time data:", user);
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
                IsApproved: user.IsApproved,
                image: user.image
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


export const updateUserbyId = async (req, res) => {
    let result = null;
    try {
        const { id } = req.params;
        //const file = req.file.path;


        const { name,
            email,
            phone,

            village,
            Father } = req.body;

        const UpdateUser = await db.User.update({
            where: {
                id: id,
            },
            data: {
                name,
                email,
                phone,

                village,
                Father
            },
        });



        return res.status(201).json(UpdateUser);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: "Error Updating User",
        });

    }

}

export const forgetpassword = async (req, res) => {
    const { email } = req.body;//email,
    //console.log("🚀 VPSss is running THIS");
    //console.log("🔥 My NEW controller is running");
    //console.log("Rakshitt Backend:email:", email)
    // console.log("NEEEEWW_DATE:", new Date(Date.now()));// + 10 * 60 * 1000
    try {
        const our_user = await db.User.findUnique({
            where: {

                email

            }
        })

        console.log("user:", our_user)

        if (!our_user) {

            return res.status(401).json({
                message: "User Email Not found for Password Reset Process"
            })

        }


        const otp = String(crypto.randomInt(100000, 999999));
        const hashed = crypto.createHash("sha256").update(otp).digest("hex");
        const expiry = new Date(Date.now() + (10 * 60 * 1000));// 

        // if (isNaN(expiry.getTime())) {
        //     console.error("Expiry date is invalid");
        //     return res.status(500).json({ error: "Failed to generate OTP expiry date" });
        // }
        // console.log('TTL minutes:', ttlMin);
        // console.log("expiry raw:", expiry);
        // console.log("expiry instanceof Date:", expiry instanceof Date);
        // console.log("expiry.getTime():", expiry.getTime());
        // console.log("expiry.toISOString():", expiry.toISOString());


        await db.User.update({
            where: {
                id: our_user.id
            },
            data: {
                passwordResetToken: hashed,
                passwordResetExpiry: expiry,
            },
        });

        //console.log("otp:", otp);
        //const message = `Your OTP for password reset is ${otp}. This OTP is valid for ${process.env.OTP_TTL_MINUTES} minutes.`;


        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT || 587),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });


        const info = await transporter.sendMail({
            from: '"Abugoad Youth Connect Support" <noreply@abugoadyouthconnect.com>',
            to: our_user.email,
            subject: "Your OTP for Password Reset AbugoadYouthConnect",
            text: `<h2>Hello  ${our_user.name},</h2><p>Your OTP: ${otp}</h2><p>Expires in ${process.env.OTP_TTL_MINUTES} minutes</p><p>Do not share OTP with anyone.</p>`,
            html: `Hello  ${our_user.name},<br>Your One Time Password (OTP) is <b>${otp}</b> For Password Reset in Abugoadyouthconnect.com. Expires in ${process.env.OTP_TTL_MINUTES} minutes.Do not share OTP with anyone`,
        });

        //console.log("info:", info)


        return res.status(200).json({
            success: true,
            message: "OTP send Successfully to Your Email ID",
            email,
            hashed,

        })


    } catch (error) {
        console.error("Failed to send Otp to your Email please try again:", error);
        return res.status(500).json({
            error: "Error sending Otp to email please try again"
        })

    }

}



export const resetpassword = async (req, res) => {
    const { email, token } = req.params;
    //console.log("email:", email, "token:", token);
    const { password } = req.body;
    try {

        if (!token) {
            return res.status(401).json({
                message: "OTP is INVALID"
            })
        }

        const user_verfiytoken = await db.User.findUnique(
            {
                where: {
                    email: email,
                    passwordResetToken: token
                }
            });





        if (!user_verfiytoken) {
            return res.status(401).json({
                message: "OTP is INVALID"
            })
        }
        if (user_verfiytoken.passwordResetExpiry < Date.now()) {
            return res.status(401).json({
                message: "OTP is Expired"
            })
        }

        console.log('user_verfiytoken', user_verfiytoken);


        if (!user_verfiytoken) {

            return res.status(401).json({
                message: "OTP is not valid for user"
            })

        }

        const hashedOtp = crypto.createHash("sha256").update(token).digest("hex");

        if (token !== user_verfiytoken.passwordResetToken) {

            return res.status(401).json({
                message: "OTP is not Match for user"
            })

        }



        if (!password) {
            return res.status(400).json({ error: "new password are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        await prisma.User.update({
            where: {
                email: user_verfiytoken.email
            },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpiry: null
            }
        });

        //res.json({ message: "Password reset successfully" });



        return res.status(200).json({
            success: true,
            message: "Password Reset Sucessfully",
            user_verfiytoken

        })


    } catch (error) {
        console.error("Error Otp verify in user:", error);
        return res.status(500).json({
            error: "Error Otp verify in user"
        })

    }

}



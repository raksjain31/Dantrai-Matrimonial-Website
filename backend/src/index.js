import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";


import authRoutes from "./routes/auth.routes.js";

dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(session(
    {
        secret: "mysecret",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24//1day
        }

    }

))


app.get("/", (req, res) => {
    res.send("Welcome to Abugoad Youth Connect🤝")

})

app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
})
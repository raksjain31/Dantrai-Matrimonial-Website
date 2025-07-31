import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";


import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import adminRoutes from "./routes/admin.routes.js";


dotenv.config()
const app = express();

app.use(
    cors({
        origin: process.env.BASE_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)
app.use(express.json());
app.use(cookieParser());

// app.use(setCorsHeaders);

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

app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/admin", adminRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
})
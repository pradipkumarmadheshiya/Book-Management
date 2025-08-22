import express from "express"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./database/db.js";
import {errorMiddleware} from "./middlewares/error.middleware.js"
import authRouter from "./routes/auth.routes.js"

export const app=express()

config({path:".env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth", authRouter)

connectDB()

app.use(errorMiddleware)
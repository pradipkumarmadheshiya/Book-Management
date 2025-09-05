import express from "express"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./database/db.js";
import {errorMiddleware} from "./middlewares/error.middleware.js"
import authRouter from "./routes/auth.routes.js"
import bookRouter from "./routes/book.routes.js"
import borrowRouter from "./routes/borrow.routers.js"
import userRouter from "./routes/user.routers.js"
import expressFileupload from "express-fileupload"
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

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
app.use(expressFileupload({useTempFiles:true, tempFileDir:"/tmp/"}))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/book", bookRouter)
app.use("/api/v1/borrow", borrowRouter)
app.use("/api/v1/user", userRouter)

notifyUsers()
removeUnverifiedAccounts()

connectDB()

app.use(errorMiddleware)
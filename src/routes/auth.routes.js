import express from "express"
import {login, logout, register, verifyOtp} from "../controllers/auth.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const router=express.Router()
router.post("/register", register)
router.post("/verify-otp", verifyOtp)
router.post("/login", login)
router.get("/logout", isAuthenticated, logout)

export default router
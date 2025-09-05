import express from "express"
import {getAllUsers, registerNewAdmin} from "../controllers/user.controller.js"
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js"

const router=express.Router()

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers)
router.post("/add/new-admin", isAuthenticated, isAuthorized("Admin"), registerNewAdmin)

export default router
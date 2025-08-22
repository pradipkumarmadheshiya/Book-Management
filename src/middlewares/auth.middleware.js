import { userModel } from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.middleware.js";
import jwt from "jsonwebtoken"

export const isAuthenticated=catchAsyncErrors(async(req, res, next)=>{
    const {token}=req.cookies

    if(!token){
        return next(new ErrorHandler("User is not Authenticated", 400))
    }

    const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user=await userModel.findById(decoded.id)
    next()
})
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors"
import {userModel} from "../models/user.model.js"

export const getAllUsers=catchAsyncErrors(async(req, res, next)=>{
    const users=await userModel.find({accountVerified:true})
    res.status(200).json({success:true, users})
})

export const registerNewAdmin=catchAsyncErrors(async(req, res, next)=>{
    
})
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, {
  errorMiddleware,
} from "../middlewares/error.middleware.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return next(new ErrorHandler("Please enter all fields", 400));
    }

    const isRegistered = await userModel.findOne({
      email,
      accountVerified: true,
    });
    if (isRegistered) {
      return next(new ErrorHandler("User already Exists", 400));
    }

    const registrationAttemptsByUser = await userModel.find({
      email,
      accountVerified: false,
    });

    if (registrationAttemptsByUser.length >= 5) {
      return next(
        new ErrorHandler(
          "You have exceeded the number of registration attemps. Please contact support",
          400
        )
      );
    }

    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler("Password must be between 8 and 16 characters", 400)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationCode = await user.generateVerificationCode();

    await user.save();
    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    next(error);
  }
});

export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body || {};

  if (!email || !otp) {
    return next(new ErrorHandler("Email or otp is missing.", 400));
  }

  try {
    const userAllEntries = await userModel
      .find({
        email,
        accountVerified: false,
      })
      .sort({ createdAt: -1 });

    if (!userAllEntries.length) {
      return next(new ErrorHandler("User not found.", 404));
    }

    let user;
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await userModel.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
    } else {
      user = userAllEntries[0];
    }

    if (user.verificationCode != otp) {
      return next(new ErrorHandler("Invalid otp", 400));
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();

    if(currentTime>verificationCodeExpire){
        return next(new ErrorHandler("otp expired.", 400))
    }

    user.accountVerified=true
    user.verificationCode=null
    user.verificationCodeExpire=null
    await user.save({validateModifiedOnly:true})

    sendToken(user, 200, "Account Verified", res)

  } catch (error) {
    return next(new ErrorHandler("Internal server error.", 500));
  }
});

export const login=catchAsyncErrors(async(req, res, next)=>{
  const {email, password}=req.body || {}

  if(!email || !password){
    return next(new ErrorHandler("Enter all fields", 400))
  }

  const user=await userModel.findOne({
    email,
    accountVerified:true
  }).select("+password")

  if(!user){
    return next(new ErrorHandler("Invalid email or password", 400))
  }

  const isPasswordMached=await bcrypt.compare(password, user.password)
  if(!isPasswordMached){
    return next(new ErrorHandler("Invalid email or password", 400))
  }

  sendToken(user, 200, "User login successful", res)
})

export const logout=catchAsyncErrors(async(req, res, next)=>{
  res.status(200).cookie("token", "", {
    expires:new Date(Date.now()),
    httpOnly:true
  }).json({success:true, message:"Logged out successfully"})
})
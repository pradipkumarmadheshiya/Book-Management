import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.middleware.js"
import {bookModel} from "../models/book.model.js"

export const addBook=catchAsyncErrors(async(req, res, next)=>{
    const {title, description, author, price, quantity}=req.body || {}

    if(!title || !description || !author || !price || !quantity){
        return next(new ErrorHandler("Please fill all fields.", 400))
    }

    const book=await bookModel.create({title, description, author, price, quantity})

    res.status(201).json({success:true, message:'Book added', book})
})

export const getAllBooks=catchAsyncErrors(async(req, res, next)=>{
    const books=await bookModel.find()
    res.status(200).json({success:true, books})
})

export const deleteBook=catchAsyncErrors(async(req, res, next)=>{
    const {id}=req.params

    const book=await bookModel.findById(id)

    if(!book){
        return next(new ErrorHandler("Book not found", 404))
    }

    await book.deleteOne()

    res.status(200).json({success:true, message:"Book deleted successfully."})
})
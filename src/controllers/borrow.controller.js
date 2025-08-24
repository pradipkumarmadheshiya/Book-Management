import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import {bookModel} from "../models/book.model.js"
import {userModel} from "../models/user.model.js"
import {borrowModel} from "../models/borrow.model.js"
import ErrorHandler from "../middlewares/error.middleware.js"

export const borrowedBooks= catchAsyncErrors(async(req, res, next)=>{

})

export const getBorrowedBooksForAdmin= catchAsyncErrors(async(req, res, next)=>{

})

export const recordBorrowedBooks= catchAsyncErrors(async(req, res, next)=>{
    const {id} = req.params

    const {email}=req.body || {}

    const book=await bookModel.findById(id)

    if(!book){
        return next(new ErrorHandler("Book not found.", 404))
    }

    const user=await userModel.findOne({email})

    if(!user){
        return next(new ErrorHandler("User not found", 404))
    }

    if(book.quantity===0){
        return next(new ErrorHandler("Book not available", 400))
    }

    const isAlreadyBorrowed=user.borrowedBooks.find(b=>b.bookId.toString()===id && b.returned===false)

    if(isAlreadyBorrowed){
        return next(new ErrorHandler("Book already borrowed", 400))
    }

    book.quantity-=1
    book.availability=book.quantity>0
    await book.save()

    user.borrowedBooks.push({
        bookId:book._id,
        bookTitle:book.title,
        borrowedDate:new Date(),
        dueDate:new Date(Date.now()+1000*60*60*24*7)
    })

    await user.save()

    await borrowModel.create({
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },
        book:book._id,
        dueDate:new Date(Date.now()+1000*60*60*24*7),
        price:book.price
    })

    res.status(200).json({success:true, message:"Borrowed book recorded successfully."})
})

export const returnBorrowedBooks= catchAsyncErrors(async(req, res, next)=>{
    
})
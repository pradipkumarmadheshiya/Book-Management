import express from "express"
import { borrowedBooks, getBorrowedBooksForAdmin, recordBorrowedBooks, returnBorrowedBooks } from "../controllers/borrow.controller.js"
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js"

const router=express.Router()

router.post("/record-borrow-book/:id", isAuthenticated, isAuthorized("Admin"), recordBorrowedBooks)
router.get("/borrowed-books-by-users", isAuthenticated, isAuthorized("Admin"), getBorrowedBooksForAdmin)
router.get("/my-borrowed-books", isAuthenticated, borrowedBooks)
router.put("/return-borrowed-book/:bookId", isAuthenticated, isAuthorized("Admin"), returnBorrowedBooks)


export default router 
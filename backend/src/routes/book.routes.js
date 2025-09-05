import express from "express"
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js"
import { addBook, deleteBook, getAllBooks } from "../controllers/book.controller.js"

const router=express.Router()

router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook)
router.get("/all", isAuthenticated, getAllBooks)
router.delete("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteBook)

export default router
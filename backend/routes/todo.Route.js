import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.Controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/create',authMiddleware,createTodo)
router.get('/get',authMiddleware,getTodo)
router.delete('/delete/:id',authMiddleware,deleteTodo)
router.put('/update/:id',authMiddleware,updateTodo)

export default router
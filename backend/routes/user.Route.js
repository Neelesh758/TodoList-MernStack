import express from "express";
import { loginController, registerController } from "../controllers/user.Controller.js";

//Router Object

const router = express.Router()

//Routes
//Register || Post

router.post('/register',registerController)

//Login || Post
router.post('/login', loginController)

export default router
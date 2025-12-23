import express from "express";
import testController from "../controllers/test.Controllers.js";

const router = express.Router();

//Routes
router.get('/',testController)

//export
export default router;
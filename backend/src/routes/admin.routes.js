import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { adminLogin } from "../controllers/admin.controller.js";

const router=Router()

router.post('/login',upload.none(),adminLogin)


export default router
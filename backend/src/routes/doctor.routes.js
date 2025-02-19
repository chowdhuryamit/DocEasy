import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { doctorLogin, getDoctor, logout } from "../controllers/doctor.controller.js";
import  {verifyJwtDoctor}  from "../middlewares/doctor.middleware.js";

const router = Router()

router.post('/login',upload.none(),doctorLogin)
router.get('/get-doctor',verifyJwtDoctor,getDoctor)
router.post('/logout',verifyJwtDoctor,logout)

export default router
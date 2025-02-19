import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { cancelAppoinment, completeAppoinment, doctorLogin, getAppoinments, getDoctor, logout } from "../controllers/doctor.controller.js";
import  {verifyJwtDoctor}  from "../middlewares/doctor.middleware.js";

const router = Router()

router.post('/login',upload.none(),doctorLogin)
router.get('/get-doctor',verifyJwtDoctor,getDoctor)
router.post('/logout',verifyJwtDoctor,logout)
router.get('/get-appoinments',verifyJwtDoctor,getAppoinments)
router.patch('/complete-appoinment',verifyJwtDoctor,completeAppoinment)
router.patch('/cancel-appoinment',verifyJwtDoctor,cancelAppoinment)

export default router
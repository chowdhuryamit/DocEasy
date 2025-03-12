import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { cancelAppoinment, completeAppoinment, doctorLogin, forgetPassword, getAppoinments, getDashboard, getDoctor, logout, passwordReset, updateDoctorInfo } from "../controllers/doctor.controller.js";
import  {verifyJwtDoctor}  from "../middlewares/doctor.middleware.js";
import rateLimit from 'express-rate-limit'

const router = Router()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, msg: "Too many requests, please try again later" }
  });

router.post('/login',upload.none(),doctorLogin)
router.get('/get-doctor',verifyJwtDoctor,getDoctor)
router.post('/logout',verifyJwtDoctor,logout)
router.get('/get-appoinments',verifyJwtDoctor,getAppoinments)
router.patch('/complete-appoinment',verifyJwtDoctor,completeAppoinment)
router.patch('/cancel-appoinment',verifyJwtDoctor,cancelAppoinment)
router.get('/get-dashData',verifyJwtDoctor,getDashboard)
router.patch('/update-doctor',verifyJwtDoctor,upload.none(),updateDoctorInfo)
router.post('/forget-password',upload.none(),limiter,forgetPassword)
router.post('/reset-password',upload.none(),limiter,passwordReset)

export default router
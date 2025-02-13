import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addDoctor, adminLogin, adminLogout, changeAvailability, getAdmin, getDoctors } from "../controllers/admin.controller.js";
import { verifyJwtAdmin } from "../middlewares/admin.middleware.js";

const router=Router()

router.post('/login',upload.none(),adminLogin)
router.post('/logout',verifyJwtAdmin,adminLogout)
router.post('/add-doctor',verifyJwtAdmin,upload.single('picture'),addDoctor)
router.get('/get-admin',verifyJwtAdmin,getAdmin)
router.get('/get-doctors',verifyJwtAdmin,getDoctors)
router.patch('/change-availability',verifyJwtAdmin,changeAvailability)


export default router
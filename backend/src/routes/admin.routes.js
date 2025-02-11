import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addDoctor, adminLogin, adminLogout, getAdmin } from "../controllers/admin.controller.js";
import { verifyJwtAdmin } from "../middlewares/admin.middleware.js";

const router=Router()

router.post('/login',upload.none(),adminLogin)
router.post('/logout',verifyJwtAdmin,adminLogout)
router.post('/add-doctor',verifyJwtAdmin,upload.single('picture'),addDoctor)
router.get('/get-admin',verifyJwtAdmin,getAdmin)


export default router
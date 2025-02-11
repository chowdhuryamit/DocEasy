import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { adminLogin, adminLogout } from "../controllers/admin.controller.js";
import { verifyJwtAdmin } from "../middlewares/admin.middleware.js";

const router=Router()

router.post('/login',upload.none(),adminLogin)
router.post('/logout',verifyJwtAdmin,adminLogout)


export default router
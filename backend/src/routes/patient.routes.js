import {Router} from 'express'
import { upload } from "../middlewares/multer.middleware.js";
import { bookAppoinment, getPatient, loginPatient, logoutPatient, registerPatient, updatePatientInfo } from '../controllers/patient.controllers.js';
import { verifyJWT } from '../middlewares/patient.middleware.js';

const router=Router();

router.post('/create-account',upload.none(),registerPatient);//upload.none()->is apply to handle form data
router.post('/login',upload.none(),loginPatient);
router.post('/logout',verifyJWT,logoutPatient);
router.get('/get-patient',verifyJWT,getPatient);
router.patch('/update-info',verifyJWT,upload.single('image'),updatePatientInfo)
router.post('/book-appoinment',verifyJWT,bookAppoinment)

export default router
import {Router} from 'express'
import { upload } from "../middlewares/multer.middleware.js";
import { bookAppoinment, cancelAppoinment, getAllAppoinments, getDoctor, getPatient, loginPatient, logoutPatient, registerPatient, updatePatientInfo } from '../controllers/patient.controllers.js';
import { verifyJWT } from '../middlewares/patient.middleware.js';

const router=Router();

router.post('/create-account',upload.none(),registerPatient);//upload.none()->is apply to handle form data
router.post('/login',upload.none(),loginPatient);
router.post('/logout',verifyJWT,logoutPatient);
router.get('/get-patient',verifyJWT,getPatient);
router.patch('/update-info',verifyJWT,upload.single('image'),updatePatientInfo)
router.post('/book-appoinment',verifyJWT,bookAppoinment)
router.get('/get-my-appoinments',verifyJWT,getAllAppoinments)
router.post('/cancel-appoinment',verifyJWT,cancelAppoinment)
router.get('/get-doctor',getDoctor)

export default router
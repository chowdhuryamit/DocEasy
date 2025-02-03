import {Router} from 'express'
import { upload } from "../middlewares/multer.middleware.js";
import { registerPatient } from '../controllers/patient.controllers.js';

const router=Router();

router.post('/create-account',registerPatient);

export default router
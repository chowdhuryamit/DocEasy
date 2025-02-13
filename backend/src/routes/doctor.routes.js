import { Router } from "express";
import { getDoctor } from "../controllers/doctor.controller.js";

const router = Router()

router.get('/get-doctor',getDoctor)


export default router
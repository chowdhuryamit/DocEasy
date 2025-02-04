import jwt from "jsonwebtoken";
import {Patient} from "../models/patient.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    

    if (!token) {
      return res.status(200).json({success:false, msg: "Access denied. No token provided." });
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!payload) {
      return res.status(200).json({success:false, msg: "Access denied. Invalid token." });
    }

    const patient = await Patient.findById(payload._id).select("-password");

    if (!patient) {
      return res.status(200).json({success:false, msg: "Patient not found." });
    }
    req.patient = patient;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error." });
  }
};

export{
  verifyJWT
}
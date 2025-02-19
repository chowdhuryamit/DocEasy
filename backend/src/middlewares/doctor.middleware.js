import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.model.js";

const verifyJwtDoctor = async (req, res, next) => {
  const token = req.cookies._d;
  if (!token) {
    return res.status(200).json({success:false, msg: "Unauthorized request for doctor" });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!payload) {
      return res.status(200).json({success:false, msg: "Invalid token for doctor" });
    }

    const doctor = await Doctor.findById(payload._id).select("-password -slots_booked")

    if(!doctor){
        return res
        .status(200)
        .json({success:true,msg:'doctor not found'})
    }
    req.doctor = doctor;
    next();
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'error occured while validating doctor information'})
  }
};

export { verifyJwtDoctor };

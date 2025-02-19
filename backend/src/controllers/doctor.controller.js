import { Doctor } from "../models/doctor.model.js";

const doctorLogin = async (req,res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(200)
      .json({ success: false, msg: "email and password is required" });
  }

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(200).json({ success: false, msg: "doctor not found" });
    }

    const isPasswordCorrect = await doctor.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res
        .status(200)
        .json({ success: false, msg: "incorrect password" });
    }

    const accessToken = await doctor.generateAccessToken();

    if (!accessToken) {
      return res
        .status(200)
        .json({ success: false, msg: "access token is not generated" });
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    doctor.toObject();
    delete doctor.password;

    if (doctor) {
      return res
        .status(200)
        .cookie("_d", accessToken, options)
        .json({
          success: true,
          msg: `${doctor.name} logged in successfully`,
          doctor,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "error occured while removing password" });
    }
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'error occured while login'})
  }
};

const getDoctor = async (req,res) =>{
    if(!req.doctor){
        return res
        .status(200)
        .json({success:false,msg:'doctor not logged in'})
    }

    return res
    .status(200)
    .json({success:true,msg:'doctor data fetched successfully',doctor:req.doctor})
}

const logout = async (req,res) =>{
    if(!req.doctor){
        return res
        .status(200)
        .json({success:false,msg:'doctor not logged in'})
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    };

    return res
    .status(200)
    .clearCookie('_d',options)
    .json({success:true,msg:`${req.doctor.name} logged out successfully`})
}


export {
    doctorLogin,
    getDoctor,
    logout
};

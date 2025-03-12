import { Doctor } from "../models/doctor.model.js";
import { Appoinment } from "../models/appoinment.model.js";
import mongoose, { set } from "mongoose";
import { Earnings } from "../models/earnings.model.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(200)
      .json({ success: false, msg: "email and password is required" });
  }

  try {
    const doctorInfo = await Doctor.findOne({ email });

    if (!doctorInfo) {
      return res.status(200).json({ success: false, msg: "doctor not found" });
    }

    const isPasswordCorrect = await doctorInfo.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res
        .status(200)
        .json({ success: false, msg: "incorrect password" });
    }

    const accessToken = await doctorInfo.generateAccessToken();

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

    const doctor=doctorInfo.toObject();
    delete doctor.password;
    delete doctor.createdAt;
    delete doctor.updatedAt;

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
      .json({ success: false, msg: "error occured while login" });
  }
};

const getDoctor = async (req, res) => {
  if (!req.doctor) {
    return res
      .status(200)
      .json({ success: false, msg: "doctor not logged in" });
  }
  
  return res.status(200).json({
    success: true,
    msg: "doctor data fetched successfully",
    doctor: req.doctor,
  });
};

const logout = async (req, res) => {
  if (!req.doctor) {
    return res
      .status(200)
      .json({ success: false, msg: "doctor not logged in" });
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("_d", options)
    .json({ success: true, msg: `${req.doctor.name} logged out successfully` });
};

const getAppoinments = async (req, res) => {
  if (!req.doctor) {
    return res
      .status(200)
      .json({ success: true, msg: "doctor is not logged in" });
  }

  try {
    const { page = 1, limit = 5 } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const pageSkip = (parseInt(page, 10) - 1) * parsedLimit;
    const sortStage = {};
    sortStage["createdAt"] = -1;

    const appoinments = await Appoinment.aggregate([
      {
        $match: {
          doc: new mongoose.Types.ObjectId(req.doctor._id),
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patient",
          foreignField: "_id",
          as: "patient",
          pipeline: [
            {
              $project: {
                name: 1,
                photo: 1,
              },
            },
          ],
        },
      },
      {
        $sort: sortStage,
      },
      {
        $skip: pageSkip,
      },
      {
        $limit: parsedLimit,
      },
    ]);

    const totalDocuments = await Appoinment.countDocuments({
      doc: new mongoose.Types.ObjectId(req.doctor._id),
    });
    const totalPages = Math.ceil(totalDocuments / parsedLimit);
    
    if (!appoinments || !totalDocuments) {
      return res
        .status(200)
        .json({ success: false, msg: "appoinments not found" });
    } else {
      return res.status(200).json({
        success: true,
        msg: "appoinments found",
        appoinments,
        totalPages,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "error occured while fetching appoinments details",
    });
  }
};

const completeAppoinment = async (req, res) => {
  if (!req.doctor) {
    return res
      .status(200)
      .json({ success: false, msg: "doctor is not logged in" });
  }

  try {
    const { appoinmentId } = req.body;

    if (!appoinmentId) {
      return res
        .status(200)
        .json({ success: false, msg: "appoinment id is required" });
    }

    const appoinmentDetails = await Appoinment.findById(appoinmentId);

    if (!appoinmentDetails) {
      return res
        .status(200)
        .json({ success: false, msg: "appoinment not found" });
    }
    if (!appoinmentDetails.doc.equals(req.doctor._id)) {
      return res
        .status(200)
        .json({ success: false, msg: "you are not authorized to do so" });
    }

    const updatedAppoinment = await Appoinment.findByIdAndUpdate(
      appoinmentId,
      {
        $set: {
          isCompleted: true,
          payment: true,
        },
      },
      { new: true }
    );

    if (!updatedAppoinment) {
      return res
        .status(200)
        .json({ success: false, msg: "appoinment is not completed" });
    } else {

      const earnings = await Earnings.findOne({docId:new mongoose.Types.ObjectId(req.doctor._id)})

      if(earnings){
       let amount = Number(earnings.Earnings)
       amount+=Number(appoinmentDetails.amount)
        const newEarnings = await Earnings.findByIdAndUpdate(earnings._id,{
          $set:{
            Earnings:String(amount)
          }
        })
        if(!newEarnings){
          return res
          .status(200)
          .json({success:false,msg:'earnings is not updated successfully'})
        }
      }
      else{
        const newEarnings = await Earnings.create({
          docId:req.doctor._id,
          Earnings:appoinmentDetails.amount
        })

        if(!newEarnings){
          return res
          .status(200)
          .json({success:false,msg:'earnings is not updated successfully'})
        }
      }
      
      return res
        .status(200)
        .json({ success: true, msg: "Appoinment successfully completed" });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: "error occured while updating appoinment status",
    });
  }
};

const cancelAppoinment = async (req, res) => {
  if (!req.doctor) {
    return res
      .status(200)
      .json({ success: false, msg: "doctor is not logged in" });
  }
  try {
    const { appoinmentId } = req.body;

    if (!appoinmentId) {
      return res
        .status(200)
        .json({ success: false, msg: "appoinment id is required" });
    }

    const appoinmentDetails = await Appoinment.findById(appoinmentId);

    if (!appoinmentDetails) {
      return res
        .status(200)
        .json({ success: false, msg: "appoinment not found" });
    }
    if (!appoinmentDetails.doc.equals(req.doctor._id)) {
      return res
        .status(200)
        .json({ success: true, msg: "you are not authorized to do so" });
    }

    const updatedAppoinment = await Appoinment.findByIdAndUpdate(
      appoinmentId,
      {
        $set: {
          cancelled: true,
        },
      },
      { new: true }
    );

    if (!updatedAppoinment) {
      return res
        .status(200)
        .json({
          success: false,
          msg: "appoinment cancellation failed",
        });
    } else {
      return res
        .status(200)
        .json({ success: true, msg: "appoinment cancelled successfully" });
    }
  } catch (error) {
    return res
    .status(404)
    .json({success:false,msg:'error occured while cancelling appoinment'})
  }
};

const getDashboard = async (req,res) =>{
  if(!req.doctor){
    return res
    .status(200)
    .json({success:false,msg:'doctor is not logged in'})
  }
  try {
    const appoinments = await Appoinment.aggregate([
      {
        $match:{
          doc:new mongoose.Types.ObjectId(req.doctor._id)
        }
      },
      {
        $lookup:{
          from:'patients',
          localField:'patient',
          foreignField:'_id',
          as:'patient',
          pipeline:[
            {
              $project:{
                name:1,
                photo:1,
              }
            }
          ]
        }
      }
    ])

    if(!appoinments){
      return res
      .status(200)
      .json({success:false,msg:'appoinments not found'})
    }

    let earnings=0;
    let totalAppoinments=0;
    let totalCompletedAppoinments=0;
    let totalCancelledAppoinments=0;
    appoinments.map((item)=>{
      totalAppoinments++;
      if(item.isCompleted){
        totalCompletedAppoinments++;
      }
      if(item.cancelled){
        totalCancelledAppoinments++;
      }
    })

    let patients=new Set()
    appoinments.map((item)=>{
      patients.add(item.patient[0]._id.toString())
    })
     
    const earning = await Earnings.findOne({docId:new mongoose.Types.ObjectId(req.doctor._id)})

    if(earning){
      earnings=earning.Earnings
    }

    return res
    .status(200)
    .json({success:true,msg:'dashboard data fetched successfully',
      earnings,
      totalCancelledAppoinments,
      totalCompletedAppoinments,
      totalPatients:patients.size,
      totalAppoinments,
      pendingAppoinments:totalAppoinments-(totalCancelledAppoinments+totalCompletedAppoinments),     
      topAppoinments:appoinments.reverse().slice(0,10)
    })
  } catch (error) {
    return res
    .status(200)
    .json({success:false,msg:'error occured while fetching data'})
  }
}

const updateDoctorInfo = async (req,res) =>{
  try {
    if(!req.doctor){
      return res
      .status(200)
      .json({success:false,msg:'doctor not logged in'})
    }
  
    const {about,fees,address,availability,email,phone,experience} = req.body;

    if(about===""||fees===""||address===""||availability===""||email===""||phone===""||experience===""){
      return res
      .status(200)
      .json({success:false,msg:'all fields are required'})
    }
  
    const existingDoctor = await Doctor.findOne({
      $or:[
        {email:email},
        {phone:phone}
      ]})
    
    if(existingDoctor && !existingDoctor._id.equals(req.doctor._id)){
      return res
      .status(200)
      .json({success:false,msg:'email or phone already in use'})
    }  
  
    const updatedInfo = await Doctor.findByIdAndUpdate(req.doctor._id,{
      $set:{
        about:about,
        fees:fees,
        address:address,
        availability:availability,
        email:email,
        phone:phone,
        experience:experience
      }
    },{new:true}).select('-password -createdAt -updatedAt')
  
    if(!updatedInfo){
      return res
      .status(200)
      .json({success:false,msg:'information not updated successfully'})
    }
    else{
      return res
      .status(200)
      .json({success:true,msg:'information updated successfully',doctor:updatedInfo})
    }
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'error occured while updating information'})
  }
}

const forgetPassword =async (req,res) =>{
  try {
    const {email} = req.body;
    if(!email){
      return res
      .status(200)
      .json({success:false,msg:'email is required'})
    }

    const existingDoctor = await Doctor.findOne({email})

    if(!existingDoctor){
      return res
      .status(200)
      .json({success:false,msg:'Doctor does not exist with this email'})
    }

    const token = jwt.sign({email,timeStamp:Date.now()},process.env.DOCTOR_TOKEN_SECRET,{expiresIn:'10m'})

    const transporter = nodemailer.createTransport({
      service:'gmail',
      secure:true,
      auth:{
        user:process.env.MY_GMAIL,
        pass:process.env.MY_PASSWORD
      }
    })

    const receiver = {
      from: 'doceasy442@gmail.com',
      to: email,
      subject: 'Password Reset Request - Secure Action Required',
      text: `Dear User,
    
    We received a request to reset your password. If you made this request, please click the link below to proceed:
    
    🔗 Reset Password: ${process.env.CLIENT_URL}/doctor/${token}
    
    This link is one time use only.
    
    ⚠️ **Security Notice:**
    - **DO NOT** share this link with anyone, including support staff.
    - If you did **not** request a password reset, **DO NOT CLICK** on the link.
    - If you suspect unauthorized activity, **change your password immediately** and contact support at **support@doceasy.com**.
    
    For added security, we recommend enabling **two-factor authentication (2FA)** if available.
    
    Stay safe,  
    **DocEasy Security Team**
    `,
    };
    
    

    await transporter.sendMail(receiver)

    return res
    .status(200)
    .json({success:true,msg:'password reset link send in your registered email'})
  } catch (error) {
    return res
    .status(200)
    .json({success:false,msg:'error occured while sending email'})
  }
}

const passwordReset = async (req,res) =>{
  try {
    const {token,password} = req.body

    if(!token || !password){
      return res
      .status(200)
      .json({success:false,msg:'token and password are required'})
    }

    const payload = jwt.verify(token,process.env.DOCTOR_TOKEN_SECRET)

    if(!payload){
      return res
      .status(200)
      .json({success:false,msg:'invalid credentials'})
    }

    const existingDoctor = await Doctor.findOne({email:payload.email})

    if(!existingDoctor){
      return res
      .status(200)
      .json({success:false,msg:'doctor does not exist'})
    }

    existingDoctor.password = password
    existingDoctor.save()

    return res
    .status(200)
    .json({success:true,msg:'password updated successfully'})
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'something went wrong while updating password'})
  }
}


export { doctorLogin, getDoctor, logout, getAppoinments, completeAppoinment,cancelAppoinment,getDashboard,updateDoctorInfo,forgetPassword,passwordReset };

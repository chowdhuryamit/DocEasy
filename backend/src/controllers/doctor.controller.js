import { Doctor } from "../models/doctor.model.js";
import { Appoinment } from "../models/appoinment.model.js";
import mongoose, { set } from "mongoose";
import { Earnings } from "../models/earnings.model.js";

const doctorLogin = async (req, res) => {
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
    console.log(error);

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


export { doctorLogin, getDoctor, logout, getAppoinments, completeAppoinment,cancelAppoinment,getDashboard };

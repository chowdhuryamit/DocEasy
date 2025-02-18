import { Doctor } from "../models/doctor.model.js";
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'
import { Appoinment } from "../models/appoinment.model.js";
import { Patient} from "../models/patient.model.js"


//admin login
const adminLogin = async(req,res) => {
    const {email,password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password  === process.env.ADMIN_PASSWORD){
       const token = jwt.sign({
          _id:process.env.ADMIN_EMAIL
       },
        process.env.ADMIN_AUTH_SEC,
       {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
       })

       const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        };

       if(token){
         return res
         .status(200)
         .cookie('_a',token,options)
         .json({success:true,msg:"admin login successfully"})
       }
       else{
         return res
         .status(400)
         .json({success:false,msg:"error occured while generating token for admin"})
       }
    }
    else{
        return res
        .status(200)
        .json({success:false,msg:"invaild credentials"})
    }
}

//admin logout
const adminLogout = async (req,res)=>{
   const admin=req.admin
   if(!admin){
    return res
    .status(200)
    .json({success:false,msg:'admin is not login'})
   }

   const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  return res
  .status(200)
  .clearCookie('_a',options)
  .json({success:true,msg:'admin logout successfully'})
}

//add-doctor
const addDoctor = async (req,res)=>{
  let pictureLocalPath
   try {
    if(!req.admin){
      return res
      .status(200)
      .json({success:false,msg:'unauthorized request to add doctor'})
   }
   const {name,email,password,phone,address,specialization,degree,about,fees,experience} = req.body

   pictureLocalPath = req.file?.path;
   
   if(!pictureLocalPath){
    return res
    .status(200)
    .json({success:false,msg:'please upload doctor photo'})
   }
   
   if(name==""||email==""||password==""||phone==""||address==""||specialization==""||degree==""||about==""||fees==""||experience==""){
    fs.unlinkSync(pictureLocalPath)
    return res
    .status(200)
    .json({sucess:false,msg:'all fields are required about doctor'})
   }

   const existingDoctor = await Doctor.findOne({
    $or: [{email},{phone}],
   })

   if(existingDoctor){
    fs.unlinkSync(pictureLocalPath)
    return res
    .status(200)
    .json({success:false,msg:'Doctor already exist with same email or contact number'})
   }

   const cloudinaryURL= await uploadOnCloudinary(pictureLocalPath)

   if(!cloudinaryURL){
    return res
    .status(200)
    .json({success:false,msg:'error occured while uploading image in cloudinary'})
   }

   const doctor = await Doctor.create({
      name,
      email,
      password,
      phone,
      address,
      specialization,
      degree,
      about,
      fees,
      experience,
      picture:cloudinaryURL.secure_url
   })

   if(!doctor){
    return res
    .status(200)
    .json({success:false,msg:'error occured while uploading doctor to database'})
   }
   else{
    return res
    .status(200)
    .json({success:true,msg:'doctor uploaded successfully',doctor})
   }
   } catch (error) {
     if(pictureLocalPath && fs.existsSync(pictureLocalPath)){
       fs.unlinkSync(pictureLocalPath)
     }
     return res
     .status(400)
     .json({success:false,msg:'something went wrong'})
   }
}

//get-admin
const getAdmin = async (req,res) =>{
  if(req.admin==null){
     return res
     .status(200)
     .json({success:false,msg:'admin is not login'})
  }
  else{
    if(req.admin._id===process.env.ADMIN_EMAIL){
      return res
      .status(200)
      .json({success:true,msg:'admin is logged in'})
    }
    else{
      return res
     .status(200)
     .json({success:false,msg:'admin is not login'})
    }
  }
}

//get-doctor for admin
const getDoctors = async (req,res) =>{
  if(!req.admin){
     return res
     .status(200)
     .json({success:false,msg:'please login to get doctor data'})
  }
   
  try {
    const doctors = await Doctor.find().select("-password")
    if(doctors){
      return res
      .status(200)
      .json({success:true,msg:'doctor data fetched successfully',doctors})
    }
    else{
      return res
      .status(200)
      .json({success:false,msg:'doctor data is not fetched'})
    }
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'error occured while fetching doctor data'})
  }
}

//change doctor availability
const changeAvailability = async (req,res) =>{
  if(!req.admin){
    return res
    .status(200)
    .json({success:false,msg:'your not authorized to do so'})
  }

  const docId = req.query.docId

  if(!docId){
    return res
    .status(200)
    .json({success:false,msg:'doctor id is required'})
  }

  try {
    const response = await Doctor.findById(docId)

    if(!response){
      return res
      .status(200)
      .json({success:false,msg:'invalid doctor id'})
    }
    
    const updatedResponse = await  Doctor.findByIdAndUpdate(docId,{
      $set:{
        availability:!response.availability
      }
    },{new:true})

    if(updatedResponse){
      return res
      .status(200)
      .json({success:true,msg:'Availability updated successfully'})
    }
    else{
      return res
      .status(200)
      .json({success:false,msg:'kindly reload page and check availability is updated or not'})
    }
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'error occured while updating doctor availability'})
  }
}

//get appoinments-details
const getAppoinments = async (req,res) =>{
  if(!req.admin){
    return res
    .status(200)
    .json({success:false,msg:'you are not authorized to see appoinments details'})
  }

  try {
    const {page=1,limit=5} = req.query
    const parsedLimit = parseInt(limit, 10);
    const pageSkip = (parseInt(page, 10) - 1) * parsedLimit;
    const sortStage = {};
    sortStage["createdAt"] = -1;

    const appoinments = await Appoinment.aggregate([
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
    },
    {
      $lookup:{
        from:'doctors',
        localField:'doc',
        foreignField:'_id',
        as:'doc',
        pipeline:[
          {
            $project:{
              name:1,
              picture:1
            }
          }
        ]
      }
    },
    {
      $sort:sortStage
    },
    {
      $skip:pageSkip
    },
    {
      $limit:parsedLimit
    }
  ])

  const totalDocuments = await Appoinment.countDocuments();
  const totalPages = Math.ceil(totalDocuments / parsedLimit);

  if(!appoinments){
    return res
    .status(200)
    .json({success:false,msg:'appoinments not found'})
  }
  else{
    return res
    .status(200)
    .json({success:true,msg:'appoinments found',appoinments,totalPages})
  }
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'error ocured while fetching appoinments'})
  }
}

//dash-board
const getDashboard = async (req,res) =>{
  if(!req.admin){
    return res
    .status(200)
    .json({success:false,msg:'your are not authorized to see dashboard'})
  }

  try {
    const doctors = await Doctor.find()

  if(!doctors){
    return res
    .status(200)
    .json({success:false,msg:'doctors data not found'})
  }

  const user = await Patient.find()

  if(!user){
    return res
    .status(200)
    .json({success:false,msg:'patient not found'})
  }

  const appoinments =await Appoinment.aggregate([
    {
      $lookup:{
        from:'doctors',
        localField:'doc',
        foreignField:'_id',
        as:'patient',
        pipeline:[
          {
            $project:{
              name:1,
              picture:1
            }
          }
        ]
      }
    },
    {
      $project:{
        patient:1,
        slot_date:1,
        slot_time:1,
        cancelled:1,
        isCompleted:1
      }
    }
  ])

  if(!appoinments){
    return res
    .status(200)
    .json({success:false,msg:'appoinments not found'})
  }

  const dashData={
    total_doctors:doctors.length,
    total_users:user.length,
    total_appoinments:appoinments.length,
    latest_appoinments:appoinments.reverse().slice(0,10)
  }

  if(dashData){
    return res
    .status(200)
    .json({success:true,msg:'dashboard data found',dashData})
  }
  else{
    return res
    .status(200)
    .json({success:false,msg:'dashboard data not found'})
  }
  } catch (error) {
    return res
    .status(200)
    .json({success:false,msg:'error occured while fetching dashboard data'})
  }
}

export{
    adminLogin,
    adminLogout,
    addDoctor,
    getAdmin,
    getDoctors,
    changeAvailability,
    getAppoinments,
    getDashboard
}
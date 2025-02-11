import { Doctor } from "../models/doctor.model.js";
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'


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

export{
    adminLogin,
    adminLogout,
    addDoctor,
    getAdmin
}
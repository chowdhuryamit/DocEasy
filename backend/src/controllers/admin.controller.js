import { Doctor } from "../models/doctor.model.js";
import jwt from 'jsonwebtoken'


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
         .cookie('_r',token,options)
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

export{
    adminLogin
}
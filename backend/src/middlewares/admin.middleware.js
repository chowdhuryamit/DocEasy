import jwt from 'jsonwebtoken'

const verifyJwtAdmin=async(req,res,next)=>{
   const token=req.cookies._a
   
   if(!token){
    return res
    .status(200)
    .json({success:false,msg:"Unauthorized request for admin"})
   }

   const payload=jwt.verify(token,process.env.ADMIN_AUTH_SEC);

   if(!payload){
    return res
    .status(200)
    .json({success:true, msg:"Invalid token for admin"})
   }

   if(payload._id === process.env.ADMIN_EMAIL){
    req.admin=payload
    next();
   }
   else{
    return res
    .status(200)
    .json({success:false,msg:"invalid token"})
   }
}

export{
    verifyJwtAdmin
}
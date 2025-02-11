import jwt from 'jsonwebtoken'

const verifyJwtDoctor=async(req,res,next)=>{
   const token=req.cookies._d
   if(!token){
    return res.status(401).json({msg:"Unauthorized request for doctor"})
   }

   const payload=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

   if(!payload){
    return res.status(401).json({msg:"Invalid token for doctor"})
   }

   if(payload._id==process.env.DOCTOR_AUTH_SEC){
    next();
   }
   else{
    return res.status(401).json({msg:"Invalid token"})
   }
}

export{
    verifyJwtDoctor
}
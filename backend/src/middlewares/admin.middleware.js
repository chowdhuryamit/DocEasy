import jwt from 'jsonwebtoken'

const verifyJwtAdmin=async(req,res,next)=>{
   const token=req.cookies._r

   if(!token){
    return res.status(401).json({msg:"Unauthorized request for admin"})
   }

   const payload=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

   if(!payload){
    return res.status(401).json({msg:"Invalid token for admin"})
   }

   if(payload._id=process.env.ADMIN_AUTH_SEC){
    next();
   }
   else{
    return res.status(401).json({msg:"invalid token"})
   }
}

export{
    verifyJwtAdmin
}
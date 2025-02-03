import { Patient } from "../models/patient.model.js";


const registerPatient=async(req,res)=>{
   const {name,phone,password}=req.body;   

   if(name===""||phone===""||password===""){
    return res.status(400).json({success:false,msg:'all fields are required'});
   }

   try {
    const existingPatient=await Patient.findOne({phone})

    if(existingPatient){
        return res.status(400).json({success:false,msg:'phone no already in use'})
    }

    try {
        const patient=await Patient.create({
            name:name,
            password:password,
            phone:phone,
        })

        if (patient) {
            return res.status(201).json({success:true,msg: 'patient created successfully',patient})
        }
    } catch (error) {
        return res.status(400).json({success:false,msg:'error occured while creating account',error})
    }
   } catch (error) {
      return res.status(400).json({success:false,msg:'error occured while searching for existing patient'})
   }
}

export{
    registerPatient
}
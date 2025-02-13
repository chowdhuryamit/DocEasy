import { Doctor } from "../models/doctor.model.js";

const getDoctor = async (req,res) => {
  try {
    const doctors = await Doctor.find().select("-password -phone -address -email")

    if(doctors){
        return res
        .status(200)
        .json({success:true,doctors,msg:'doctor information fetched successfully'})
    }
    else{
        return res
        .status(200)
        .json({success:false,msg:'doctor information is not fetched'})
    }
  } catch (error) {
    return res
    .status(400)
    .json({success:false,msg:'error ocured while fetching doctor information'})
  }
}

export{
    getDoctor
}
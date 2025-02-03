import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
})

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){
            return false;
        }
        else{
            const response=await cloudinary.uploader.upload(localFilePath,{
                resource_type:'auto'
            })
            fs.unlinkSync(localFilePath);
            return response;
        }
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFromCloudinary=async(url)=>{
    if(!url){
        return null;
    }
    else{
      const lastIndexBackslash=url.lastIndexOf('/');
      const lastIndexDot=url.lastIndexOf('.');
      const public_id=url.substring(
        lastIndexBackslash+1,
        lastIndexDot
      )

      await cloudinary.uploader.destroy(public_id)
      .then(()=>{
        return true;
      })
      .catch(()=>{
        return false;
      })
    }
}

export{
    uploadOnCloudinary,
    deleteFromCloudinary
}

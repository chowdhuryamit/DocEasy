import mongoose from 'mongoose'

const appoinmentSchemma=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    doc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    cancelled:{
        type:Boolean,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true
    },
    payment:{
       type:String,
    }
},{timestamps:true});

const Appoinment=mongoose.model('appoinment',appoinmentSchemma);

export{
    Appoinment
}
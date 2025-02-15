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
    slot_date:{
        type:String,
        required:true,
    },
    slot_time:{
        type:String,
        required:true
    },
    cancelled:{
        type:Boolean,
        required:true,
        default:false
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    payment:{
       type:Boolean,
       required:true,
       default:false
    },
    amount:{
        type:String,
        required:true
    }
},{timestamps:true});

const Appoinment=mongoose.model('appoinment',appoinmentSchemma);

export{
    Appoinment
}
import mongoose from 'mongoose'

const totalEarnings=new mongoose.Schema({
    Earnings:{
        type:String,
        default:'0'
    },
    docId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    }
},{timestamps:true});

const Earnings=mongoose.model('earning',totalEarnings);

export{
    Earnings
}
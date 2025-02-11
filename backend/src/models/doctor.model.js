import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const doctorSchemma=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    fees:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        default:true
    },
    slots_booked:{
        type:Object,
        default:{}
    }
},{timestamps:true,minimize:false});

doctorSchemma.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
        next();
    }
})

doctorSchemma.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

const Doctor=mongoose.model('doctor',doctorSchemma);

export{
    Doctor
}
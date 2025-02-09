import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const patientSchemma=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    address:{
        type:String,
        trim:true
    },
    photo:{
        type:String,
    },
    gender:{
        type:String
    },
    dob:{
        type:String
    }
},{timestamps:true});

patientSchemma.pre("save",async function(next){
   if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,10);
   }
   next();
})

patientSchemma.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password);
}

patientSchemma.methods.generateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

const Patient=mongoose.model('patient',patientSchemma);

export{
    Patient
}
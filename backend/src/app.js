import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser());
app.use(express.static('public'))

//import all routes
import patientroutes from './routes/patient.routes.js'

app.use('/api/v1/patient',patientroutes);


export default app
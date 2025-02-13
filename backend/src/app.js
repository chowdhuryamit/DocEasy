import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true
}));
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser());
app.use(express.static('public'))

//import all routes
import patientroutes from './routes/patient.routes.js'
import adminroutes from './routes/admin.routes.js'
import doctorroutes from './routes/doctor.routes.js'

//patient
app.use('/api/v1/patient',patientroutes);

//admin
app.use('/api/v2/admin',adminroutes)

//doctor
app.use('/api/v3/doctor',doctorroutes)


export default app
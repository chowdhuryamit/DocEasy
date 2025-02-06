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

app.use('/api/v1/patient',patientroutes);


export default app
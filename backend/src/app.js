import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import {Server} from 'socket.io'

const app=express();
const server=createServer(app);
const io=new Server(server,{
    cors:true
})


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



//socket request
const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();
const socketIdtoNameMap = new Map();

io.on('connection',(socket)=>{
    console.log('a new connection:',socket.id);
    socket.on('room:join',(data)=>{
      const {name,email,roomId} = data;
      emailToSocketIdMap.set(email,socket.id);
      socketIdToEmailMap.set(socket.id,email);
      socketIdtoNameMap.set(socket.id,name);
      socket.join(roomId);
      io.to(roomId).emit('user:joined',{name,id:socket.id,roomId});
      io.to(socket.id).emit('room:join',data);
    })

    socket.on('user:call',({to,offer})=>{
        io.to(to).emit('incomming:call',{from:socket.id,offer,nameFrom:socketIdtoNameMap.get(socket.id),nameTo:socketIdtoNameMap.get(to)})
    })

    socket.on('call:accepted',({to,ans})=>{
       io.to(to).emit('call:accepted',{from:socket.id,ans,name:socketIdtoNameMap.get(to)})
    })


    socket.on('peer:nego:nedded',({to,offer})=>{
        io.to(to).emit('peer:nego:nedded',{from:socket.id,offer})
    })

    socket.on('peer:nego:done',({to,ans})=>{
        io.to(to).emit('peer:nego:final',{from:socket.id,ans});
    })

    socket.on('user:disconnect',({to})=>{
        console.log('user disconnected',to);
        io.to(to).emit('user:disconnect',{from:socket.id})
        const email = socketIdToEmailMap.get(socket.id);
        if(email){
            emailToSocketIdMap.delete(email);
            socketIdToEmailMap.delete(socket.id);
            socketIdtoNameMap.delete(socket.id);
        }
    })

    socket.on('disconnect',()=>{
      console.log('a user has left');
      const email = socketIdToEmailMap.get(socket.id)
      if (email) {
        emailToSocketIdMap.delete(email);
        socketIdToEmailMap.delete(socket.id);
        socketIdtoNameMap.delete(socket.id);
      }
    })
})


export default server
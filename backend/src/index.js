import dotenv from 'dotenv'
import connectionDB from './db/index.js'
import app from './app.js'

dotenv.config()

connectionDB()
.then(()=>{
    app.listen(process.env.PORT||7000,()=>{
        console.log(`server is running at port:${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log('mongodb connection failed!!',error);
})
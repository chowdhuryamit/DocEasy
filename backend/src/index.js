import dotenv from 'dotenv'
import connectionDB from './db/index.js'
import server from './app.js'

dotenv.config()
const port=process.env.PORT||7000

connectionDB()
.then(()=>{
    server.listen(port,()=>{
        console.log(`server is running at port:${port}`);
    })
})
.catch((error)=>{
    console.log('mongodb connection failed!!',error);
})
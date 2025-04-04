import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/mongodb.js'
import { connectCloudinary } from './config/cloudinary.js'
import { adminRouter } from './routes/admin.route.js'
import doctorRouter from './routes/doctor.route.js'


const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
//localhost/4000/api/admin

app.get('/',(req, res)=>{
    res.send('API working')
})

app.listen(port, ()=>console.log("Server Started at port " , port))
//5.07.48
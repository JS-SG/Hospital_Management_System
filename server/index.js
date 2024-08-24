import express from 'express'
import cors from 'cors'
import { adminRouter} from './Routes/AdminRoutes.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import {config} from 'dotenv'
import cloudinary from 'cloudinary'

/*cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
config({path:"./config/config.env"})
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}))
app.use(cookieParser)*/

const app=express()
const port = 3001
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())
app.use('/',adminRouter)
app.use(express.static('Public'))

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
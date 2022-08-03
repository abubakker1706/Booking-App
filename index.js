import express from 'express'
import mongoose from 'mongoose'
import AuthRoutes from './routes/Auth.js'
import HotelRoute from './routes/Hotel.js'
import RoomRoute from './routes/Rooms.js'
import UserRoute from './routes/User.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()

const PORT=process.env.PORT

const MONGO_URL=process.env.MONGO_URL


const connect= async()=>{
      try {
              await mongoose.connect(MONGO_URL)  
              console.log('connected to mongodb')         
      } catch (error) {
                   throw error    
      }
}
mongoose.connection.on('connected',()=>{
                         console.log(' mongodb connected ')
})
mongoose.connection.on('disconnected',()=>{
                         console.log(' mongodb disconnected ')
})
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())



app.get('/',(req,res)=>{
       res.send('hello word')
})
app.use('/api/auth',AuthRoutes)
app.use('/api/hotels',HotelRoute)
app.use('/api/users',UserRoute)
app.use('/api/rooms',RoomRoute)
//error handling
app.use((err,req,res,next)=>{
const errorStatus = err.status|| 500
const errorMessage = err.message|| 'Something went wrong'
res.status(errorStatus).json({
      message: errorMessage,
      success: false,
      status: errorStatus,
      stack: err.stack
})
})
app.listen(PORT,()=>{
connect()
console.log('listening on port')
})
import Hotel from '../models/HotelSchema.js'
import Room from '../models/RoomSchema.js'
import { createError } from '../Utils/error.js'


export const createRoom=async(req, res, next) =>{
const hotelId = req.params.hotelid

const newRoom = new Room(req.body)

try {
const savedRoom = await newRoom.save()   
try {
          
await Hotel.findByIdAndUpdate(hotelId,{
$push:{rooms:savedRoom._id}
})
} catch (error) {
          next(error)               
}
res.status(200).json(savedRoom) 
                         
} catch (error) {
              next(error)           
}
}

export const updateRooms = async(req, res, next)=>{
                         try {
          
                         const updateRoom= await Room.findByIdAndUpdate(
                         req.params.id,
                         {$set:req.body},
                         {new:true}
                                                  )
                         res.status(200).json(updateRoom)
                         } catch (error) {
                             next(error)                   
                         }

}
export const updateRoomAvailability = async(req, res, next)=>{
  try {

  await Room.updateOne(
    {
      "roomNumbers._id":req.params.id
    },
    {
      $push:{
        "roomNumbers.$.unavailableDates":req.body.dates
      }
    }
  )
  res.status(200).json("Room status has been updated.")
  } catch (error) {
      next(error)                   
  }

}
export const deleteRoom = async(req, res,next) =>{
 const hotelId = req.params.hotelid


 try {
                                   
                         await Room.findByIdAndDelete(req.params.id)
try {
          
                         await Hotel.findByIdAndUpdate(hotelId,{
                         $pull:{rooms:req.params.id}})
} catch (error) {
 next(error)               
                                                  }
                         res.status(200).json('Room deleted successfully')
                         } catch (error) {
                           next(error)                    
                                                  }    
}

export const getSpecificRoom = async(req, res, next) =>{
                         try {
                                   
                         const getRoom= await Room.findById(req.params.id)
                         res.status(200).json(getRoom)
                         } catch (error) {
                         next(error)                    
                         }      
}

export const getAllRoom = async(req, res, next) =>{
                         try {
                                   
                         const getAllRooms= await Room.find()
                         res.status(200).json(getAllRooms)
                         } catch (error) {
                         next(error)                    
                         }
}
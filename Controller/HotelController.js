import Hotel from '../models/HotelSchema.js'
import Room from '../models/RoomSchema.js'

export const createHotel=async(req, res, next)=>{
                         const newHotel=  new Hotel(req.body)
                         try {
                                  const savedHotel = await newHotel.save() 
                                  res.status(200).json(savedHotel)               
                         } catch (error) {
                                  next(error)               
                         }
}

export const updateHotel = async(req, res, next)=>{
                         try {
          
                         const updateHotel= await Hotel.findByIdAndUpdate(
                         req.params.id,
                         {$set:req.body},
                         {new:true}
                                                  )
                         res.status(200).json(updateHotel)
                         } catch (error) {
                             next(error)                   
                         }

}

export const deleteHotel = async(req, res,next) =>{

 try {
                                   
                         await Hotel.findByIdAndDelete(req.params.id)
                         res.status(200).json('Hotel deleted successfully')
                         } catch (error) {
                           next(error)                    
                                                  }    
}

export const getSpecificHotel = async(req, res, next) =>{
                         try {
                                   
                         const getHotel= await Hotel.findById(req.params.id)
                         res.status(200).json(getHotel)
                         } catch (error) {
                         next(error)                    
                         }      
}

export const getAllHotels = async(req, res, next) =>{
  const{min,max,...other}=req.query
                 try {
                                   
                  const getAllHotel= await Hotel.find({
                    ...other,
                  cheapestPrice:{$gt:min|1,$lt:max||999}})
                  .limit(req.query)
                         res.status(200).json(getAllHotel)
                         } catch (error) {
                         next(error)                    
                         }
}
export const countByCity= async(req, res, next) =>{
  const cities =req.query.cities.split(",")
  try {
            
  const List= await Promise.all(cities.map(city=>{
    return Hotel.countDocuments({city: city})
  })) //since we are searching for more item we are using Promise.all()
  res.status(200).json(List)
  } catch (error) {
  next(error)                    
  }
}
export const countByType= async(req, res, next) =>{
  
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }

}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
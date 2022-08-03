import express from 'express';
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotelRooms, getSpecificHotel, updateHotel } from '../Controller/HotelController.js';
import { verifyAdmin } from '../Utils/verifyToken.js';

const router = express.Router();




router.post('/',verifyAdmin,createHotel)
router.put('/:id',verifyAdmin,updateHotel)
router.delete('/:id',verifyAdmin,deleteHotel)
router.get('/find/:id',getSpecificHotel)
router.get('/',getAllHotels)
router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
router.get('/rooms/:id',getHotelRooms)



export default router
import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getSpecificRoom, updateRoomAvailability, updateRooms } from '../Controller/RoomController.js';
import { verifyAdmin } from '../Utils/verifyToken.js';

const router = express.Router();

router.post('/:hotelid',verifyAdmin,createRoom)
router.put('/:id',verifyAdmin,updateRooms)
router.put('/availability/:id',updateRoomAvailability)
router.delete('/:id/:hotelid',verifyAdmin,deleteRoom)
router.get('/:id',getSpecificRoom)
router.get('/',getAllRoom)


export default router
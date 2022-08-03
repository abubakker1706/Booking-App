import express from 'express';
import { deleteUser, getAllUsers, getSpecificUser, updateUser } from '../Controller/UserController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../Utils/verifyToken.js';

const router = express.Router();

router.get('/checkauthentication',verifyToken,(req, res,next) => {
 res.send('hello user your logged in ')
})

router.get('/checkuser/:id',verifyUser,(req, res, next) => {
res.send('hello user your logged in and you can edit your account ')     
})
router.get('/checkadmin/:id',verifyAdmin,(req, res, next) => {
                         res.send('hello admin your logged in and you can edit your account ')     
                         })


router.put('/:id',verifyUser,updateUser)
router.delete('/:id',verifyUser,deleteUser)
router.get('/:id',verifyUser,getSpecificUser)
router.get('/',verifyAdmin,getAllUsers)


export default router
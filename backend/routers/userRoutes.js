import express from 'express'
import { getUsers, userDetail, userLogin, userRegister, userUpdate, getUser } from '../controllers/userController.js';
import { adminAuth } from '../middlewares/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register',userRegister);
userRouter.post('/login',userLogin);
userRouter.get('/me', userDetail);
userRouter.get('/:id', adminAuth, getUser)
userRouter.patch('/:id', userUpdate);
userRouter.get('/', adminAuth, getUsers);

export default userRouter;
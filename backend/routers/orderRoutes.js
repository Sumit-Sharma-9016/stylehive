import express from 'express'
import { createOrder, getOrders, updateOrders, getOrder } from '../controllers/orderController.js';
import { userAuth } from '../middlewares/userAuth.js';
import {adminAuth} from '../middlewares/adminAuth.js'
const orderRouter = express.Router();

orderRouter.post('/create', userAuth, createOrder);
orderRouter.get('/get', adminAuth, getOrders);
orderRouter.get('/:id', getOrder)
orderRouter.patch('/:id',adminAuth, updateOrders);

export default orderRouter;
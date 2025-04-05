import express from 'express'
import upload from '../middlewares/multer.js'
import { createProduct, getProducts, deleteProduct, updateProduct, updateReviews} from '../controllers/productController.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import {userAuth} from '../middlewares/userAuth.js'

const productRouter = express.Router();

productRouter.post('/create', adminAuth, upload.array('images'), createProduct);
productRouter.get('/get', getProducts);
productRouter.delete('/:id', adminAuth, deleteProduct);
productRouter.patch('/reviews/:id', updateReviews)
productRouter.patch('/:id', adminAuth, upload.array('images'), updateProduct);

export default productRouter;
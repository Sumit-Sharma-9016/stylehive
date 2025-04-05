import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongoDB.js';
import {connectCloudinary} from './config/cloudinary.js'
import productRouter from './routers/productRoutes.js'
import userRouter from './routers/userRoutes.js';
import orderRouter from './routers/orderRoutes.js';

// configuration
dotenv.config();
connectDB();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using routes
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
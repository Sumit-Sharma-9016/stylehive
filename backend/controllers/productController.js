import { cloudinary } from "../config/cloudinary.js"
import fs from 'fs'
import Product from "../models/ProductModel.js";
import { isValidObjectId } from "mongoose";

// function to create a product
export const createProduct = async(req, res) => {
    try {
        const {title, description, price, category} = req.body;

        const available = JSON.parse(req.body.available);
        const type = JSON.parse(req.body.type);

        if(!title || !description || !price || !available|| !type) {
            return res.json({message: "fill all the required details!"})
        }
    
        let images = [];
    
        if(req.files) {
            for(let file of req.files) {
                try {
                    const result = await cloudinary.uploader.upload(file.path);
    
                    images.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    })
    
                    fs.unlinkSync(file.path);
                } catch (error) {
                    console.error("Error uploading to cloudinary : ", error)
                }
            }
        }
        const newProduct = new Product({
            title,
            description,
            images,
            price,
            available,
            category,
            type
        });
        
        const data = await newProduct.save();
        res.json({success: true, data, message: 'Added successfully!'});
    } catch (error) {
        res.json({success: false, message: 'Server error', error: error.message})
    }
};

// function to get all products 

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({}).exec();
        res.json({success: true, products})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// function to delete product

export const deleteProduct = async(req, res) => {
    try {
        if(!isValidObjectId(req.params.id)) {
            return res.json({message: "ProductId is not valid!"})
        }
        const product = await Product.findByIdAndDelete(req.params.id, {runValidators: true});

        for(let image of product.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }
        res.json({success: true, message: 'Product deleted successfully!', product})
    } catch(error) {
        res.json({success: false, error: error.message})
    }
}

// function to update product

export const updateProduct = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.json({ success: false, message: "Invalid Product ID!" });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.json({ success: false, message: "Product not found!" });
        }

        const { title, description, price, available, category, type } = req.body;

        let updatedImages = product.images;

        if (req.files && req.files.length > 0) {
            for (let image of product.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }

            updatedImages = [];

            for (let file of req.files) {
                try {
                    const result = await cloudinary.uploader.upload(file.path);

                    updatedImages.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });

                    fs.unlinkSync(file.path);
                } catch (error) {
                    console.error("Error uploading to Cloudinary: ", error);
                }
            }
        }

        const updatedProduct = {
            title,
            description,
            price: price ? parseFloat(price) : product.price, // Ensure price is a number
            available: available ? JSON.parse(available) : product.available, // Parse JSON if required
            category,
            type: type? JSON.parse(type) : product.type,
            images: updatedImages,
        };

        const updatedProductData = await Product.findByIdAndUpdate(
            req.params.id,
            updatedProduct,
            { new: true, runValidators: true }
        );

        res.json({ success: true, message: "Updated successfully!", updatedProductData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const updateReviews = async (req, res) => {
    const {userId, isVerified, username, rating, message} = req.body;
    try {
        if(!isValidObjectId(req.params.id)) {
            return res.json({success: false, message: 'Invalid object ID'});
        }
        const product = await Product.findById(req.params.id);
        let newReviews = [...product.reviews, {userId, isVerified, username, rating, message}];
        const result = await Product.findByIdAndUpdate(req.params.id, {reviews: newReviews});
        return res.json({success: true, message: 'Review Posted!'});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

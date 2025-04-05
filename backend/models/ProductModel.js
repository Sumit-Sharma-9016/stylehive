import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    available: [
        {
            size: String,
            stock: {
                type: Number,
                min: 0,
                required: true
            }
        }
    ],
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: [String],
        required: true,  // Ensures at least one item is present
        validate: {
            validator: function (value) {
                return value.length > 0; // Ensures the array has at least one element
            },
            message: "At least one type is required",
        },
    },
    reviews: [
        {
            userId: {
               type: mongoose.Schema.Types.ObjectId,
               required: true
            },
            isVerified: {
                type: Boolean,
                required: true,
            },
            username: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 0,
                max: 5
            },
            message: {
                type: String,
                required: true,
            }
        }
    ]
}, {timestamps:true});

const Product = mongoose.model('Product', productSchema);

export default Product;
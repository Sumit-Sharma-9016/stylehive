import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 1
            },
            quantity: {
                type: Number,
                min: 1,
                required: true,
            },
            selectedSize: {
                type: String,
                required: true
            }
        }
    ],
    bill: {
        value: {
            type: Number,
            required: true,
            min: 0,
        },
        tax: {
            type: Number,
            required: true,
            min: 0
        },
        deliveryCharge: {
            type: Number,
            required: true,
            min: 0
        },
        total: {
            type: Number,
            required: true,
            min: 0
        }
    },
    payment: {
        mode : {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum:["Pending", "Paid"]
        }
    },
    status: {
        type: String,
        enum: ["Order Placed", "Order Processing", "Shipped", "Out for Delivery", "Delivered", "Order Cancelled"],
        required: true
    },
    address: String,
    date: String
});

const Order = mongoose.model('Order',orderSchema);
export default Order;
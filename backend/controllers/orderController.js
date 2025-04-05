
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";


export const createOrder = async(req, res) => {
    try {
        const {userId, cart, bill, payment, status, address, date} = req.body;
        if(!userId, !cart, !bill, !payment, !status, !address) {
            return res.json({success: false, message: "missing required fields!"});
        }
        let newOrder = new Order({
            userId,
            cart,
            bill,
            payment,
            status,
            address,
            date
        });

        const result = await newOrder.save();
        for (const item of cart) {
            let product = await Product.findById(item.productId);
            let updatedAvailable = product.available.map((sizes) => {
                if(sizes.size === item.selectedSize) {
                    return {size: sizes.size, stock: sizes.stock - item.quantity};
                } else
                return sizes;
            })
            await Product.findByIdAndUpdate(item.productId, {$inc: { sold: item.quantity }, available: updatedAvailable});
        }
        res.json({success: true, message: 'Order Placed!', orderId: result._id});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({});
        res.json({success: true, data: orders})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.json({success: true, data: order})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const updateOrders = async(req, res) => {
    try {
        const {payment, status} = req.body;
        if(!payment && !status) {
            return res.json({success: false, message: 'cannot update fields!'})
        }
        const result = await Order.findByIdAndUpdate(req.params.id, {payment, status}, {new: true});
        res.json({success: true, message:'Updated successfully!' })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
import mongoose from 'mongoose';

// Define the order schema
const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // ID of the user placing the order
    items: { 
        type: Array, 
        required: true 
    }, // Array of items in the order
    amount: { 
        type: Number, 
        required: true 
    }, // Total amount of the order
    address: { 
        type: Object, 
        required: true 
    }, // Delivery address
    status: { 
        type: String, 
        default: "Food Processing" 
    }, // Status of the order
    date: { 
        type: Date, 
        default: Date.now 
    }, // Date of order creation
    payment: { 
        type: Boolean, 
        default: false 
    }, // Payment status (false for COD until delivered)
});

// Create and export the order model
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;

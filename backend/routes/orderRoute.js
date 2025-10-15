import express from "express";
import authMiddleware from './../middleware/auth.js';
import {
    placeOrder,
    userOrders,
    listOrders,
    updateStatus,
    deleteOrderById,
    deleteAllOrders
} from "../controllers/orderController.js"; 

const orderRouter = express.Router();

// Route to place an order (authentication required)
orderRouter.post("/place", authMiddleware, placeOrder);

// Route to get user-specific orders (authentication required)
orderRouter.post("/userorders", authMiddleware, userOrders);

// Route to list all orders for the admin panel
orderRouter.get('/list', listOrders);

// Route to update the status of an order
orderRouter.post('/status', updateStatus);

// Route to delete a specific order by ID (authentication required)
orderRouter.delete('/:id', deleteOrderById);

// Route to delete all orders (authentication required, admin only)
orderRouter.delete('/deleteAll', deleteAllOrders);

export default orderRouter;

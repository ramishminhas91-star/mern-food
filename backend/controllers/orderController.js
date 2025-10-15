import orderModel from './../models/orderModel.js'; 
import userModel from './../models/userModel.js';

// Placing user order for frontend (Cash on Delivery only)
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:5173';
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: 'cash', 
            payment: false 
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        return res.json({ success: true, message: "Order placed with Cash on Delivery", orderId: newOrder._id });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error placing order" });
    }
};

// Function to get user-specific orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        return res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching user orders" });
    }
};

// Function to list all orders for the admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching orders" });
    }
};

// Function to update the status of an order
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        return res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error updating status" });
    }
};

// Function to fetch orders with payment status
const fetchOrdersWithPaymentStatus = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('userId', 'name email');
        return res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching orders" });
    }
};

// Function to delete a specific order by ID
const deleteOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await orderModel.findByIdAndDelete(id);
        if (deletedOrder) {
            return res.status(200).json({
                success: true,
                message: "Order deleted successfully.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the order.",
            error: error.message,
        });
    }
};

// Function to delete all orders
const deleteAllOrders = async (req, res) => {
    try {
      const result = await orderModel.deleteMany({});
      console.log("Delete result:", result); // Log the result of deleteMany
      return res.status(200).json({
        success: true,
        message: "All orders have been deleted successfully.",
      });
    } catch (error) {
      console.error('Error occurred while deleting all orders:', error); // Log detailed error
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting all orders.",
        error: error.message,
      });
    }
  };
  

// Export the functions
export { 
    placeOrder, 
    userOrders, 
    listOrders, 
    updateStatus, 
    fetchOrdersWithPaymentStatus, 
    deleteOrderById, 
    deleteAllOrders 
};

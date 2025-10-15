import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from  '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the server
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        // Sort orders by index in descending order
        const sortedOrders = response.data.data.sort((a, b) => b.index - a.index);
        setOrders(sortedOrders);
        console.log(sortedOrders);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching orders.");
    }
  };

  // Delete a specific order by ID
  const deleteOrderById = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await axios.delete(`${url}/api/order/${orderId}`);
        if (response.data.success) {
          toast.success("Order deleted successfully.");
          await fetchAllOrders(); // Refresh the order list
        } else {
          toast.error("Failed to delete order.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the order.");
      }
    }
  };

  // Delete all orders
  const deleteAllOrders = async () => {
    try {
        await axios.delete('http://localhost:4000/api/orders/deleteAll'); // Correct port
        setOrders([]); // Clear state after successful deletion
        console.log('All orders deleted successfully');
    } catch (error) {
        console.error('Error deleting all orders:', error);
    }
};


  // Handle status update for an order
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh the order list
        toast.success("Order status updated successfully.");
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the order status.");
    }
  };

  // Function to handle printing of orders
  const handlePrint = () => {
    if (window.confirm("Do you want to print the order details?")) {
      let printContent = "Order Details:\n\n";
      let totalAmount = 0;

      orders.forEach(order => {
        printContent += `Name: ${order.address.firstName} ${order.address.lastName}\n`;
        printContent += `Phone: ${order.address.phone}\n`;
        printContent += `Address: ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}\n`;
        printContent += `Items:\n`;

        order.items.forEach(item => {
          printContent += `  - ${item.name} x ${item.quantity}\n`;
        });

        printContent += `Amount: Rs ${order.amount.toFixed(2)}\n\n`;
        totalAmount += order.amount;
      });

      printContent += `Total Amount: Rs ${totalAmount.toFixed(2)}`;

      // Create a Blob for the file
      const blob = new Blob([printContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'order_details.txt'; // This prompts the user to select a location on their computer
      document.body.appendChild(a);
      a.click(); // Simulate a click on the link to trigger the download
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAllOrders(); // Fetch new data every 30 seconds
    }, 30000); // 30 seconds in milliseconds
  
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <button onClick={handlePrint}>Print Orders</button>
      <button onClick={deleteAllOrders}>Delete All Orders</button>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Order Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">{`${order.address.firstName} ${order.address.lastName}`}</p>
                <div className="order-item-address">
                  <p>{`${order.address.state},`}</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs {order.amount.toFixed(2)}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button onClick={() => deleteOrderById(order._id)} className='delete-order'>Delete Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

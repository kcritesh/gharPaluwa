import Product from "../../models/Product.js";
import Order from "../../models/Orders.js";
import User from "../../models/User.js";

import { sendOrderConfirmationEmailToCustomer } from "../email/emailServices.js";

export async function createOrder(customerId, orderItems) {
  try {
    // Calculate the total price based on order items
    let totalPrice = 0;

    for (const item of orderItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }
      if (product.quantity < item.quantity) {
        throw new Error(
          `Product with ID ${item.productId} does not have enough stock.`
        );
      }
      totalPrice += product.price * item.quantity;
      item.price = product.price;
      item.name = product.name;
      item.vendorId = product.userId;

      // Update the stock of the product
      product.quantity -= item.quantity;
      //   await product.save();
    }

    const order = new Order({
      customer: customerId,
      products: orderItems.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        vendorId: item.vendorId,
      })),
      totalPrice,
    });

    const savedOrder = await order.save();
    sendOrderConfirmationEmailToCustomer(customerId, savedOrder);
    return savedOrder;
  } catch (error) {
    throw error;
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );
    if (!updatedOrder) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }
    if (newStatus === "completed") {
      //   const customer = await User.findById(updatedOrder.customer);
      //   if(!customer) {
      //     throw new Error(`Customer with ID ${updatedOrder.customer} not found.`);
      //   }
      //   customer.totalOrders += 1;
      //   await customer.save();
    }
    if (newStatus === "cancelled") {
      for (const item of updatedOrder.products) {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found.`);
        }
        product.quantity += item.quantity;
        await product.save();
      }
    }
    return updatedOrder;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCustomerOrders(customerId) {
  try {
    const orders = await Order.find({ customer: customerId }).populate(
      "products.product"
    );
    return orders;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOrdersByVendorId(vendorId) {
  try {
    const orders = await Order.find({
      "products.vendorId": vendorId,
    }).populate("customer", "firstName lastName username email"); // Populate customer details

    return orders;
  } catch (error) {
    throw new Error(error);
  }
}

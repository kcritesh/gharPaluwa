import Product from '../../models/Product.js';
import Order from '../../models/Orders.js';

import { sendOrderConfirmationEmailToCustomer } from '../email/emailServices.mjs';

export async function createOrder(customerId, orderItems) {
  try {
    const totalPrice = 0;

    await Promise.all(
      orderItems.map(async (originalItem) => {
        const product = await Product.findById(originalItem.productId);

        if (!product) {
          throw new Error(
            `Product with ID ${originalItem.productId} not found.`
          );
        }

        if (product.quantity < originalItem.quantity) {
          throw new Error(
            `Product with ID ${originalItem.productId} does not have enough stock.`
          );
        }

        const item = {
          ...originalItem,
          price: product.price,
          name: product.name,
          vendorId: product.userId,
        };

        // Update the stock of the product
        product.quantity -= item.quantity;
        await product.save();
      })
    );

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
    throw new Error('Failed to create order. Please try again.');
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
    if (newStatus === 'completed') {
      //   const customer = await User.findById(updatedOrder.customer);
      //   if(!customer) {
      //     throw new Error(`Customer with ID ${updatedOrder.customer} not found.`);
      //   }
      //   customer.totalOrders += 1;
      //   await customer.save();
    }
    if (newStatus === 'cancelled') {
      Promise.all(
        updatedOrder?.products.map(async (item) => {
          const product = await Product.findById(item.product);
          if (!product) {
            throw new Error(`Product with ID ${item.product} not found.`);
          }
          product.quantity += item.quantity;
          await product.save();
        })
      );
    }
    return updatedOrder;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOrdersByCustomerId(customerId) {
  try {
    const orders = await Order.find({
      customer: customerId,
    }).populate(
      'products.product customer',
      'name price firstName lastName username email'
    );

    const customerOrders = [];

    orders.forEach((order) => {
      const orderWithCustomerProducts = {
        orderId: order.id,
        products: order.products,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
      };

      customerOrders.push(orderWithCustomerProducts);
    });

    const result = {
      customerOrders,
    };

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOrdersByVendorId(vendorId) {
  try {
    const orders = await Order.find({
      'products.vendorId': vendorId,
    }).populate('customer', 'firstName lastName username email'); // Populate customer details

    const vendorOrders = [];

    orders.forEach((order) => {
      const orderWithVendorProducts = {
        orderId: order.id,
        customer: order.customer,
        products: order.products,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
      };

      vendorOrders.push(orderWithVendorProducts);
    });

    const result = {
      vendorOrders,
    };

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

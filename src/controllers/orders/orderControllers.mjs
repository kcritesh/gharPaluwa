import * as OrderServices from "../../services/orders/orderService.mjs";

export async function createOrder(req, res) {
  const { orderItems } = req.body;
  const { userId } = req.User;
  try {
    const order = await OrderServices.createOrder(userId, orderItems);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrdersByVendorId(req, res) {
  const { userId } = req.User;
  try {
    const orders = await OrderServices.getOrdersByVendorId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrdersByCustomerId(req, res) {
  const { userId } = req.User;
  try {
    const orders = await OrderServices.getOrdersByCustomerId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
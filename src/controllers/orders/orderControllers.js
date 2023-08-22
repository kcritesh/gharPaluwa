import * as OrderServices from "../../services/orders/orderService.js";

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

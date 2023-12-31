import * as cartService from "../../services/cart/cartServices.mjs";

// ================== Controller to add to cart ==================
export async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const { userId } = req.User;
  try {
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================== Controller to get the cart by customer ID ==================
export async function getCartByCustomerId(req, res) {
  const { userId } = req.User;
  try {
    const cart = await cartService.getCartByCustomerId(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================== Controller to remove the item from cart ==================
export async function removeFromCart(req, res) {
  const { productId } = req.body;
  const { userId } = req.User;
  try {
    const cart = await cartService.removeFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================== Controller to remove the quantity of the item in cart ==================
export async function removeQuantityFromCart(req, res) {
  const { productId, quantity } = req.body;
  const { userId } = req.User;
  try {
    const cart = await cartService.removeQuantityFromCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ================== Controller to clear the cart ==================
export async function clearCart(req, res) {
  const { userId } = req.User;
  try {
    const cart = await cartService.clearCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

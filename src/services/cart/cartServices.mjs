import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

// ===========Helper function to get the total quantity of a product in the cart==============
async function getTotalQuantityInCart(userId, productId) {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return 0;
  }

  const productItem = cart.items.find((item) => item.product.equals(productId));

  return productItem ? productItem.quantity : 0;
}

// ================== Helper function to add the item to cart ==================
export async function addToCart(userId, productId, quantity) {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    // Calculate the total quantity including the quantity in the cart
    const totalQuantity =
      quantity + (await getTotalQuantityInCart(userId, productId));

    // Check if the product has sufficient total quantity
    if (product.quantity < totalQuantity) {
      throw new Error(
        `Insufficient quantity available for product ${product.name}.`
      );
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart and add the item
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      await newCart.save();
      return newCart;
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add a new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCartByCustomerId(customerId) {
  try {
    const cart = await Cart.findOne({ user: customerId }).populate({
      path: 'items.product',
      select: 'name price',
    });

    return cart || null; // Return null if no cart is found
  } catch (error) {
    // console.error("Error in getCartByCustomerId:", error.message);
    throw new Error(error);
  }
}

// ================== Helper function to remove the item from cart ==================
export async function removeFromCart(userId, productId) {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error(`Cart not found for customer with ID ${userId}`);
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (itemIndex === -1) {
      throw new Error(`Product with ID ${productId} not found in the cart`);
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error);
  }
}

// ================== Helper function to remove the quantity from cart ==================
export async function removeQuantityFromCart(
  userId,
  productId,
  quantityToRemove
) {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error(`Cart not found for user with ID ${userId}`);
    }

    // Find the item corresponding to the product in the cart
    const cartItem = cart.items.find((item) => item.product.equals(productId));

    if (!cartItem) {
      throw new Error(`Product with ID ${productId} not found in the cart`);
    }

    // Check if the requested quantity to remove is valid
    if (quantityToRemove > cartItem.quantity) {
      throw new Error(
        `Requested quantity to remove exceeds the quantity in the cart`
      );
    }

    if (quantityToRemove === cartItem.quantity) {
      // Remove the entire item from the cart if the requested quantity matches the cart quantity
      cart.items = cart.items.filter((item) => !item.product.equals(productId));
    } else {
      // Update the quantity of the item in the cart
      cartItem.quantity -= quantityToRemove;
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error);
  }
}

// ================== Helper function to clear the cart ==================
export async function clearCart(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error(`Cart not found for user with ID ${userId}`);
    }

    // Clear all items from the cart
    cart.items = [];

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error);
  }
}

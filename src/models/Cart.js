import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the product being added to the cart
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who owns the cart
    required: true,
  },
  items: [cartItemSchema], // Array of cart items
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

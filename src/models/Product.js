// Product.js

import mongoose from 'mongoose';

const ImagesSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  images: {
    type: [ImagesSchema],
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0, // Default quantity is 0
    min: 0, // Ensure quantity cannot be negative
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
  metaDescription: {
    type: String,
    default: '',
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaKeywords: {
    type: String,
    default: '',
  },
  ogImage: {
    type: String,
    default: '',
  },
  ogUrl: {
    type: String,
    default: '',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  isOutOfStock: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
      date: Date
    }
  ]
});

productSchema.index({ userId: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;


import mongoose from 'mongoose';

const shoppingCartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
  color: String,
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    products: [shoppingCartSchema],
    cartTotal: {
      type: Number,
      required: true,
    },
    totalAfterDiscount: {
      type: Number,
      default: 0,
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

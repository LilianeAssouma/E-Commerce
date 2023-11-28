import {Cart } from "../models/cartModel"
import { Product } from "../models/productModel";

// POST items to the shopping cart

export const createCart = async (req, res) => {
    try {
      const { orderBy, productId, count, color } = req.body;
      console.log('orderBy:', orderBy);
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send("Product not found");
      }
  
      let cart = await Cart.findOne({ orderBy });
  
      if (!cart) {
        cart = new Cart({ products: [], cartTotal: 0, orderBy });
      }
  
      // Checking if the product already exists in the cart
      const existingProduct = cart.products.find(
        (item) =>
          item.product.equals(productId) && item.color === color
      );
  
      // If the product exists, update the count
      if (existingProduct) {
        existingProduct.count += count;
      } else {
        cart.products.push({ product: productId, count, color, price: product.price });
      }
  
      cart.cartTotal = cart.products.reduce(
        (total, item) => total + item.count * item.price,
        0
      );
  
      await cart.save();
  
      res.status(200).json(cart);  
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };


//Update the quantity of items in cart
export const updateCart = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    const { count } = req.body;
  
    try {
      let cart;
  
      if (req.user) {
        // If the user is authenticated, find the cart for the authenticated user
        cart = await Cart.findOne({ orderBy: req.user._id });
      } else {
        
        cart = await Cart.findOne({ orderBy: null });
      }
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found for the user" });
      }
  
      // Find the item to update its count
      const cartItem = cart.products.find((item) => item.product.equals(productId));
  
      if (!cartItem) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }
  
      cartItem.count = count;
  
      // Recalculating the total
      cart.cartTotal = cart.products.reduce(
        (total, item) => total + item.count * item.price,
        0
      );
      
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


// Get user's car
export const getUserCart = async (req, res) => {
  try {
    let userCart;

    if (req.user) {
      // If the user is authenticated, find the cart for the authenticated user
      userCart = await Cart.findOne({ orderBy: req.user._id }).populate({
        path: 'products.product',
        model: 'Product',
      });

      if (!userCart) {
        // If the user has no cart, create one
        userCart = new Cart({
          products: [],
          cartTotal: 0,
          totalAfterDiscount: 0,
          orderBy: req.user._id,
        });

        await userCart.save();
      }
    } else {
      // Guest cart creation 
      userCart = await Cart.findOne({ orderBy: null }).populate({
        path: 'products.product',
        model: 'Product',
      });

      if (!userCart) {
        // No guest cart, create a new one
        userCart = new Cart({
          products: [],
          cartTotal: 0,
          totalAfterDiscount: 0,
          orderBy: null,
        });

        await userCart.save();
      }
    }

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for the user' });
    }

    res.status(200).json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





export const removeItemFromCart = async(req,res) =>{
    try {
              const { userId, productId } = req.params;
              const cart = await Cart.findOne({ orderBy: userId });
          
              if (!cart) {
                return res.status(404).json({ message: "Cart not found for the user" });
              }
          
              // Remove the item from the cart based on the productId
              cart.products = cart.products.filter((item) => !item.product.equals(productId));
          
              // Recalculate the cart total
              cart.cartTotal = cart.products.reduce(
                (total, item) => total + item.count * item.price,
                0
              );
          
              await cart.save();
          
              res.status(200).json(cart);
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: "Internal server error" });
            }
}



export const clearCart = async (req,res) =>{
    try {
                const { userId } = req.params;
            
                const cart = await Cart.findOneAndDelete({ orderBy: userId });
            
                if (!cart) {
                  return res.status(404).json({ message: "Cart not found for the user" });
                }
            
                res.status(200).json({ message: "Cart cleared successfully" });
              } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
              }
}





 
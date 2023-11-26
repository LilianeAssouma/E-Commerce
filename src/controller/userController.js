
import { User } from "../models/userModel";

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { isValidObjectId } from "mongoose";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

 export const getAllUser = async(req,res)=>{        //getting all users with paginating
const options = {
   page: parseInt(req.query.page),
   limit: parseInt(req.query.limit),
};

await User.paginate({}, options).then((data) => {
  
 res.status(200).json({user: data,
  userDetails: req.query,
});

}).catch((err) => {
 console.log("error",err);
 res.status(409).json({
   message:"internal server error"
 })
});;
 }  




//find one user in the database by id
export const getaUser = async (req, res) => {                        
  
  try {
    const id = req.params.id;
    let userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

//delete users
export const deleteUser = async (req,res)=>{
    const { id} = req.params;
    try {
      const deleteUser= await User.findByIdAndDelete(id);
  
      if (!deleteUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({
        message: "User successfully deleted",
        deleteUser
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    }


    
    export const updateRole = async (req,res) =>{
        try {
            const userId = req.params.id;
            console.log('Received params:', req.params);
            console.log('Extracted userId:', userId);

            if(!isValidObjectId(userId)){
              return res.status(400).json({message: 'Invalid user ID'});
            };
            console.log("userId",userId);
            const user = await User.findById(userId);
        
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
      
            user.role = req.body.role; //update role 
        
            // Save 
            const updatedUser = await user.save();
        
            res.json({ message: 'User role updated successfully', user: updatedUser });
          } catch (error) {
            console.error('Error updating user role:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
        };
    

        // const blockUser = asyncHandler(async (req, res) => {
        //   const { id } = req.params;
        //   validateMongoDbId(id);
        
        //   try {
        //     const blockusr = await User.findByIdAndUpdate(
        //       id,
        //       {
        //         isBlocked: true,
        //       },
        //       {
        //         new: true,
        //       }
        //     );
        //     res.json(blockusr);
        //   } catch (error) {
        //     throw new Error(error);
        //   }
        // });
        
        // const unblockUser = asyncHandler(async (req, res) => {
        //   const { id } = req.params;
        //   validateMongoDbId(id);
        
        //   try {
        //     const unblock = await User.findByIdAndUpdate(
        //       id,
        //       {
        //         isBlocked: false,
        //       },
        //       {
        //         new: true,
        //       }
        //     );
        //     res.json({
        //       message: "User UnBlocked",
        //     });
        //   } catch (error) {
        //     throw new Error(error);
        //   }
        // });




        export const getUserProfile = async (req, res) => {
          try {
             const userId = req.user._id;
            const user = await User.findById(userId);
        
            if (!user) {
              return res.status(404).json({
                message: "User not found",
              });
            }  
            res.status(200).json(userProfile);
          } catch (error) {
            console.error("Error:", error);
            res.status(500).json({
              message: "Internal server error",
            });
          }
        };
      
      
        // const getWishlist = asyncHandler(async (req, res) => {
        //   const { _id } = req.user;
        //   try {
        //     const findUser = await User.findById(_id).populate("wishlist");
        //     res.json(findUser);
        //   } catch (error) {
        //     throw new Error(error);
        //   }
        // });
        
        // const userCart = asyncHandler(async (req, res) => {
        //   const { cart } = req.body;
        //   const { _id } = req.user;
        //   validateMongoDbId(_id);
        //   try {
        //     let products = [];
        //     const user = await User.findById(_id);
        //     // check if user already have product in cart
        //     const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        //     if (alreadyExistCart) {
        //       alreadyExistCart.remove();
        //     }
        //     for (let i = 0; i < cart.length; i++) {
        //       let object = {};
        //       object.product = cart[i]._id;
        //       object.count = cart[i].count;
        //       object.color = cart[i].color;
        //       let getPrice = await Product.findById(cart[i]._id).select("price").exec();
        //       object.price = getPrice.price;
        //       products.push(object);
        //     }
        //     let cartTotal = 0;
        //     for (let i = 0; i < products.length; i++) {
        //       cartTotal = cartTotal + products[i].price * products[i].count;
        //     }
        //     let newCart = await new Cart({
        //       products,
        //       cartTotal,
        //       orderby: user?._id,
        //     }).save();
        //     res.json(newCart);
        //   } catch (error) {
        //     throw new Error(error);
        //   }
        // });
        
        // const getUserCart = asyncHandler(async (req, res) => {
        //   const { _id } = req.user;
        //   validateMongoDbId(_id);
        //   try {
        //     const cart = await Cart.findOne({ orderby: _id }).populate(
        //       "products.product"
        //     );
        //     res.json(cart);
        //   } catch (error) {
        //     throw new Error(error);
        //   }
        // });
        
        // const emptyCart = asyncHandler(async (req, res) => {
        //   const { _id } = req.user;
        //   validateMongoDbId(_id);
        //   try {
        //     const user = await User.findOne({ _id });
        //     const cart = await Cart.findOneAndRemove({ orderby: user._id });
        //     res.json(cart);
        //   } catch (error) {
        //     throw new Error(error);
        //   }
        // });
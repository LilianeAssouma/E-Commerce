import slugify from 'slugify';
import {Product} from '../models/productModel';
import { User } from '../models/userModel';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createProduct = async(req,res) =>{
  try {
    if (!req.files || !req.files.productImage) {
      return res.status(400).json({ error: "No product image found" });
  }

    if (req.body.productName){
      req.body.slug = slugify(req.body.productName)
    }  

    let imageUrls = [];

    for (let index = 0; index < req.files.productImage.length; index++) {
      let galleryImage = await cloudinary.uploader.upload(req.files.productImage[index].path);
      imageUrls.push(galleryImage.secure_url);
    }
    req.body.productImage = imageUrls.flat();

    const newProduct = await Product.create(req.body);
  if (!newProduct) {
    return res.status(404).json({
      message: "Failed to save the product"
    });
  }
    res.status(200).json(newProduct);
  } catch (error) {
      console.error("error", error);
      res.status(500).json({ error: "Internal Server Error" });  
  }
}



export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; 

    let existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({error: 'Product not found',});
    }

    req.body.slug = req.body.productName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-');

    if (req.files && req.files.productImage && Array.isArray(req.files.productImage)) {
      const imageUrls = [];
      for (let index = 0; index < req.files.productImage.length; index++) {
       
          let productImage = await cloudinary.uploader.upload(req.files.productImage[index].path);
          imageUrls.push(productImage.secure_url);
      }
      req.body.productImage = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } 
    );
   res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};






    export const getAllProduct = async(req,res) => {
        const options = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
        }
        await Product.paginate({}, options).then((data) =>{
            res.status(200).json({product: data,
            productdetails: req.query,
        })
        }).catch ((error) => {
        console.error("error", error);
        res.status(500).json({            
            message:"internal server error"
          });  
        })
        }

       

        export const viewOneProduct = async(req,res) => {
            const {id } = req.params;
            try {
            const viewaProduct = await Product.findById(id, req.body,{new: true})
            res.status(200).json(viewaProduct)
            } catch (error) {
            console.error("error", error);
            res.status(500).json({ error: "Internal Server Error" });  
            }
            }


           export const deleteProduct = async (req, res) => {
                try {
                  const product = await Product.findByIdAndDelete(req.params.id);
                  if (product) {
                    res.json({ message: "Product deleted successfully",product });
                  } else {
                    res.status(404).json({ error: "Product not found" });
                  }
                } catch (error) {
                  res.status(500).json({ error: "Internal Server Error" });
                }
              };


           export const addToWishlist = async(req, res) =>{
            const userID = req.userId;
                const {productId} = req.body;
                try {
                   const user = await User.findById(userID);
                   console.log('User ID:', userID);
                   if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                  }
                  
                   const added = user.wishlist.find((id) => id.toString() === productId); //check if product already exit
                  
                  if (added) {
                    res.status(201).json({ message: 'Product already exit in the wishlist' });
                  } else {
                    // then add it
                    user.wishlist.push(productId);
                    await user.save();
                    res.status(201).json({ message: 'Product added to wishlist successfully' });
                  }
                   
                } catch (error) {
                    console.error("error", error);
                    res.status(500).json({ error: "Internal Server Error" });     
                }
            }

    export const rating = async(req,res) =>{
      
      console.log(req.params); 
      console.log(req.body)
      const userID = req.userId;
    const {productId} = req.params;
    const {star, comment} = req.body;
    try {
     
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        };
     if (star < 1 || star > 5) {
      return res.status(400).json({ error: 'Invalid star rating. rate between 1 and 5.' });
    }

    // Add the ratings
    product.ratings.push({
      star,
      comment,
      postedBy: userID,
    });

    const totalRatings = product.ratings.reduce((sum, rating) => sum + rating.star, 0);
    product.totalRating = totalRatings / product.ratings.length;
    await product.save();

    res.status(201).json({ message: 'Product rated successfully' });
  } catch (error) {
    console.error('Error rating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// update rating of the product
    export const updateProductRating = async (req, res) => {
        try {
          console.log(req.params); 
        const {productId} = req.params;
          const product = await Product.findById(productId);
      
          const totalRating = product.ratings.length;
          const ratingsum = product.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);
      
          const actualRating = Math.round(ratingsum / totalRating);
      
          const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { totalrating: actualRating },
            { new: true }
          );
      
          res.json(updatedProduct);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
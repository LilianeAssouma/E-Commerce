
import { User } from "../../models/userModel"; 
import { authenticateUser } from "../../middleWare/authenticateUser";
const asyncHandler = require('express-async-handler');
import { comparePassword, hashPassword } from "../../utils/passwordfuncion";
import { errorHandler,notFound } from "../../middleWare/errorhandler";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


    //update user details 
    export const updateProfile = async (req, res) => {    
      try {
        const { id } = req.params; 
       
        const updatedFields = req.body;
         // Check if the user making the request is the same as the user to be updated
         if (req.userId && String(req.userId) !== id) {
          return res.status(403).json({
            message: "Unauthorized access",
          });
        }
     
    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
 // Upload profile image 
 if (req.files && req.files['profileImage'] && req.files['profileImage'][0]) {
  const backdropImage = await cloudinary.uploader.upload(req.files['profileImage'][0].path, {
    folder: 'backdrop_images',
    eager: [{ width: 200, height: 200, crop: 'thumb' }],
  });

updatedFields.profileImage  = backdropImage.secure_url; // Update profile image 
  await User.findByIdAndUpdate(id, updatedFields, { new: true }); 
  //console.log( backdropImage);
}

res.json(updatedUser);

      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };


    export const updatePassword = asyncHandler(async (req, res) => {
      try {
        const { userId } = req; // Extract user ID from the token
        const { currentPassword, newPassword } = req.body; 
    
        const user = await User.findById(userId);
    
        const isPasswordValid = await comparePassword(currentPassword, user.password); 
    
        if (!isPasswordValid) {
          return res.status(401).json({
            message: "Current password is incorrect",
          });
        }
    
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;

        const updatedUser = await user.save();
    
        res.json(updatedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
      }
    });
    
   
    

    
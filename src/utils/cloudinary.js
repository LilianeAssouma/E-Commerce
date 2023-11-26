import {v2 as cloudinary} from 'cloudinary';

import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    
});
const uploadCloudinary = async(file)=>{
    try {
    const result = await cloudinary.v2.uploader.upload(file.path,
        {
            folder: 'uploads'
        }) 
        return result.secure_url;   
    } catch (error) {
        res.status(500).json({ error: 'Cloudinary upload error', details: error.message });
    }
}
export default uploadCloudinary;
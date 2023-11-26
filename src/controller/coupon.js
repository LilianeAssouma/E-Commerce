import { Coupon } from "../models/couponModel";

export const getCoupon = async(req,res) =>{

try {
   const viewCoupon = await Coupon.find();
   res.status(200).json(viewCoupon) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}


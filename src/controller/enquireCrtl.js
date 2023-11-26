import { Enq } from "../models/enqModel";

export const createEnquiry = async(req,res) =>{
try {
    const newEnq =await Enq.create(req.body);
    res.status(200).json(newEnq);

} catch (error) {
   console.error(error);
   res.status(409).json({message:"internal sever error"}) 
}
}

export const updateEnquiry = async(req,res) =>{
    const {id} = req.params;
try {
   const updatedEnquiry = await Enq.findByIdAndUpdate(id, req.body,{new: true,});
   rres.status(200).json(updatedEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}

export const getAllEnquiry = async(req,res) =>{
    
try {
   const viewAllEnquiry = await Enq.find();
   res.status(200).json(viewAllEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}

export const getEnquiry = async(req,res) =>{
    const {id} = req.params;
try {
   const viewEnquiry = await Enq.findById(id, req.body,{new: true,});
   res.status(200).json(viewEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}


export const deleteEnquiry = async(req,res) =>{
    const {id} = req.params;
try {
   const deletedEnquiry = await Enq.findByIdAndDelete(id, req.body,{new: true,});
   res.status(200).json(deletedEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}
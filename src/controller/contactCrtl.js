import { Contact } from "../models/enqModel";

export const createContact = async(req,res) =>{
try {
    const newEnq =await Contact.create(req.body);
    res.status(200).json(newEnq);

} catch (error) {
   console.error(error);
   res.status(409).json({message:"internal sever error"}) 
}
}

export const updateContact = async(req,res) =>{
    const {id} = req.params;
try {
   const updatedEnquiry = await Contact.findByIdAndUpdate(id, req.body,{new: true,});
   rres.status(200).json(updatedEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}

export const getAllContact = async(req,res) =>{
    
try {
   const viewAllEnquiry = await Contact.find();
   res.status(200).json(viewAllEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}

export const getContact = async(req,res) =>{
    const {id} = req.params;
try {
   const viewEnquiry = await Contact.findById(id, req.body,{new: true,});
   res.status(200).json(viewEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}


export const deleteContact = async(req,res) =>{
    const {id} = req.params;
try {
   const deletedEnquiry = await Contact.findByIdAndDelete(id, req.body,{new: true,});
   res.status(200).json(deletedEnquiry) 
} catch (error) {
    console.error(error);
    res.status(409).json({message:"internal sever error"})  
}
}
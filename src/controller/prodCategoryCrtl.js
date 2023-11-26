import { Category } from "../models/prodCategoryModel";

export const newCategory = async (req, res) => {
try {
    const {categoryName} = req.body;

    if (!categoryName) {
        return res.status(400).json({ error: "Category Name is required" });
    }

const newCategory = await Category.create(req.body);
res.json(newCategory);

} catch (error) {
console.error("error", error);
res.status(500).json({ error: "Internal Server Error" });
}
    };


export const updateCategory = async(req,res) => {
const {id } = req.params;
try {
const updatedCategory = await Category.findByIdAndUpdate(id, req.body,{new: true})
res.status(200).json(updatedCategory)
} catch (error) {
console.error("error", error);
res.status(500).json({ error: "Internal Server Error" });  
}
}


export const deleteCategory = async(req,res) => {
    const {id } = req.params;
    try {
    const deletedCategory = await Category.findByIdAndDelete(id, req.body,{new: true})
    res.status(200).json({message:'successfull deleted',deletedCategory})
    } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal Server Error" });  
    }
    }


    export const getAllCategory = async(req,res) => {
        const options = {
            page: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
        }
        await Category.paginate({}, options).then((data) =>{
            res.status(200).json({prodcategory: data,
            categorydetails: req.query,
        })
        }).catch ((error) => {
        console.error("error", error);
        res.status(500).json({            
            message:"internal server error"
          });  
        })
        }


        export const getOneCategory = async(req,res) => {
            const {id } = req.params;
            try {
            const viewCategory = await Category.findById(id, req.body,{new: true})
            res.status(200).json(viewCategory)
            } catch (error) {
            console.error("error", error);
            res.status(500).json({ error: "Internal Server Error" });  
            }
            }
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Product Schema
const productSchema = new mongoose.Schema({            
    productName: {
       type: String,
        require: true,
        trim: true,  
    },
 
    slug: {            //create clean, readable, and SEO-friendly URLs
        type:String, 
        require: true,
        unique: true,
        lowercase: true,
    },
    description:  {
        type: String,
        require: true, 
    },
    price:  {
        type:Number,
        require: true, 
    },
    brand: {
        type: String,
        require: true, 
    },
    sold:{
        type: Number,
        default: 0,
    },
    productImage: [Array],
    ratings:[
        {
            star: Number,
            comment: String,
            postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            }
        }
    ],
    totalRating: {
        type: String,
        default: 0,
    },
    stock_quantity: {
        type: Number,
        default: 0,
    },

    categoryId:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Category'
}
},
{
    timestamps: true,
  }
)

productSchema.plugin(mongoosePaginate);
export const Product = mongoose.model("product", productSchema);




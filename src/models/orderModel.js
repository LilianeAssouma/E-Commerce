import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Product Schema
const orderSchema = new mongoose.Schema({            
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
        },
    ],
    paymenyIntent: {},
    
    orderStatus: {
   type: String,
   default: "Not Processed",
   enum:[
    "Not processed",
    "Cash on Delivery",
    "Processing",
    "Dispatched",
    "Cancelled",
    "Delivered",

   ]
    },
    orderby:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
},

},
{
    timestamps: true,
  }
)

productSchema.plugin(mongoosePaginate);
export const Order = mongoose.model("order", orderSchema);




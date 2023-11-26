import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Product categorySchema
const categorySchema = new mongoose.Schema({            
categoryName: {
    type: String,
    require: true,
    unique: true,
    index: true,
},

},
{
    timestamps: true,
  }
)

categorySchema.plugin(mongoosePaginate);
export const Category = mongoose.model("category", categorySchema);
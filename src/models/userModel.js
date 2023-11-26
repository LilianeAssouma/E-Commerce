import mongoose from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

//User Schema
const userSchema = new mongoose.Schema({            
    email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  firstName: String,
  lastName: String,
  phone: { type: Number, unique: true, sparse: true },
  userName: String,
  gender: {
    type: String, 
    enum: ['Male', 'Female'],
  },
  profileImage: {
    type: String,
    default: 'avataaars.png',
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  cart:{
    type: Array,
    default: [],
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  address: {
    type: String,
  },
 

  refreshToken: {type: String},

  role:{type:String, default:"user"},
  
  resetOTP: {
    type: String,
    default: null,
  },

  resetOTPExpiry: {
    type: Date,
    default: null,
  },
},
{
  timestamps: true,
}
);

userSchema.plugin(mongoosePaginate);
export const User = mongoose.model("user", userSchema);

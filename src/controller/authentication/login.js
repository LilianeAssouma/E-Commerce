import { User } from "../../models/userModel";
import { comparePassword } from "../../utils/passwordfuncion";
import { generateToken } from "../../utils/jwtFunction";

//user login
export const login = async (req,res)=> {
    try {
        const user = await User.findOne({ email: req.body.email });
   
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
    
        let isPasswordCorrect = await comparePassword(
          req.body.password,
          user.password
        );
   
        if (!isPasswordCorrect) {
          return res.status(401).json({
            message: "Wrong password",
          });
        }
        // console.log("hashedPword",req.body.password);
        let token = generateToken({
          _id: user._id,
         
        });
    
        //checking user role
       if (user.role === 'admin') {
        res.status(200).json({
          message:" Admin logged in successfully",
          access_token: token,
          user: {
            email: user.email,
            password: user.password,
            role: user.role,
          }
        })
       } else if(user.role === 'user'){
        res.status(200).json({
          message:" Customer logged in successfully",
          access_token: token,
          user: {
            email: user.email,
            password: user.password,
            role: user.role,
          }
        })
       }else{
        res.status(403).json({
          message: "Unauthorized"
        })
       }

      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
};



// import jwt from "jsonwebtoken";
// export const verifyToken = async (req, res, next) => {
//     try {
//       let auth = req.headers.authorization; //token are sent here
        
//       let token = auth?.split(" ")[1];
//       console.log(token, "array auth");
  
//       // console.log(req.headers, "token");
//       if (!token) {
//        return res.status(401).json({
//           message: "No acess token is provided",
//         });
//       }
  
//      await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//           return res.status(401).json({
//             message: err.message,
//           });
//         }
       

//         const userId = decoded._id;

//         if (!userId) {
//           console.error("User ID not found in the decoded token");
//           return res.status(401).json({
//             message: "User ID not found in the decoded token",
//           });
//         }

//         req.userId = userId;
//         next(); //prevent moving to the controller
        
//       });
//     } catch (error) {
//       console.log(error, "server error");
//       res.status(500).json({
//         message: "internal server error",
//       });
//     }
//   };
  

import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
      let auth = req.headers.authorization; //token are sent here
  
      let token = auth?.split(" ")[1];
      console.log(token, "received token");
  
      // console.log(req.headers, "token");
      if (!token) {
       return res.status(401).json({
          message: "No acess token is provided",
        });
      }
  
     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(401).json({
            message: "Invalid access token",
          });
        }
        req.userId = decoded._id; //creating my object from decoder object
       
        next(); //prevent moving to the controller
      });
    } catch (error) {
      console.log(error, "server error");
      res.status(500).json({
        message: "internal server error",
      });
    }
  };
  
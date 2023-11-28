import express from "express";
import { User } from "../models/userModel";
import { verifyToken } from "./verifyToken";





// Middleware to authenticate the user
export const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - Missing token",
    });
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken; // Set the decoded user information on the request object
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
};



  
//set admin authentication
export const isAdmin = async (req, res, next) => {
  try {
    const { userId } = req; 

    const user = await User.findById(userId);

    console.log(user);

    if (user?.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Only admins are allowed to perform this action.",
      });
    }
    // res.send("welcome admin");
     next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



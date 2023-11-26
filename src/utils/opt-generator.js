import express from "express";
import otpGenerator from "otp-generator";

//Generate a 6-digit OTP
export const generateOTP = () =>{
        return otpGenerator.generate(6, {
             digits: true,
             alphabets: true,
             upperCase: true, 
             specialchars: false,
            });  
};

//Function to verify the OTP
export const verifyOTP = (userOTP, expectedOTP) => {
    return userOTP === expectedOTP;
};
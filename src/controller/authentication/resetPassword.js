
import express from 'express';
import {User} from '../../models/userModel'; 
import { generateOTP, verifyOTP } from '../../utils/opt-generator';
import { hashPassword } from '../../utils/passwordfuncion';
import { sendSMS } from  '../../utils/smsFunction';


// Forgot password 
export const forgotPassword = async (req, res) =>{
  try {
   const { phone } = req.body;
 
   const otp = generateOTP();
   const otpExpiry = Date.now() + 600000; // OTP expires in 10 minutes
   
   const updateResult = await User.findOneAndUpdate(
     {phone},
     {$set: {resetOTP: otp, resetOTPExpiry: otpExpiry}}
   );
      
   if (!updateResult) {
     return res.status(404).json({ message: 'User not found.' });
   }
 
    // Send SMS with the OTP
    const smsResult = await sendSMS(phone, `Your OTP is: ${otp}`);
 
    if (smsResult) {
     console.log('Before sending OTP');
      res.json({ message: 'OTP sent to your phone for password reset.' });
      console.log('After sending OTP');
    } else {
      res.status(500).json({ message: 'Please try again later.' });
    }
  } catch (error) {
 
   console.error('Error sending OTP.:', error);
   res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
 }
 
 
 
 
 
 // User enters OTP and New Password
 
 export const enterNewPassword = async (req, res) => {
  try {
   const { phone, otp, newPassword } = req.body;
   const resetOTPExpiryCondition = { $gt: Date.now() };

   // Verify OTP
   const user = await User.findOne({
     phone,
     resetOTP: otp,
     resetOTPExpiry: resetOTPExpiryCondition,
   });
   console.log('Phone:', phone);
   console.log('Entered OTP:', otp);
   console.log('OTP Expiry:', resetOTPExpiryCondition);
 
  if (user) {
  // Update Password
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  user.resetOTP = undefined;
  user.resetOTPExpiry = undefined; // Reset OTP and its expiry after a successful password change

  console.log('Hashed Password:', hashedPassword);
  console.log('Before saving user with a new password');
  await user.save();
  console.log('After saving user with a new password');

  // Respond with the user details
  res.json({
    message: 'Password reset successful.',
    user: {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    },
  });
}
 } catch (error) {
     console.error('Error in enterNewPassword:', error);
     res.status(500).json({ message: 'Internal server error.' });
  }
 };




//  export const enterNewPassword = async (req, res) => {
//   try {
//     const { phone, otp, newPassword } = req.body;
//     const resetOTPExpiryCondition = { $gt: Date.now() };

//     // Verify OTP
//     const user = await User.findOne({
//       phone,
//       resetOTP: otp,
//       resetOTPExpiry: resetOTPExpiryCondition,
//     });

//     if (user) {
//       // Check if the user has already reset the password
//       if (user.passwordResetCompleted) {
//         return res.status(400).json({
//           message: 'Password reset already completed. Cannot reset password again.',
//         });
//       }

//       // Update Password
//       const hashedPassword = await hashPassword(newPassword);
//       user.password = hashedPassword;
//       user.resetOTP = undefined;
//       user.resetOTPExpiry = undefined;
//       user.passwordResetCompleted = true; // Mark password reset as completed

//       await user.save();

//       // Respond with the user details
//       return res.json({
//         message: 'Password reset successful.',
//         user: {
//           _id: user._id,
//           email: user.email,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           phone: user.phone,
//         },
//       });
//     } else {
//       // Respond with an error message if OTP verification fails
//       return res.status(400).json({
//         message: 'Invalid OTP or OTP expired.',
//       });
//     }
//   } catch (error) {
//     console.error('Error in enterNewPassword:', error);
//     return res.status(500).json({ message: 'Internal server error.' });
//   }
// };


//resetting password using email

//User Request for Password Reset
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   const token = generateToken();   //Generate a Unique Token

//   await User.findOneAndUpdate(
//     { email },
//     { $set: { resetToken: token, resetTokenExpiry: Date.now() + 3600000 } } // Token expires in 1 hour
//   );

//   // Send an email with the reset link 
//   res.json({ message: 'Password reset link sent to your email.' });
// };



// //Reset Password Page
// export const resetPassword = async (req, res) => {
//   const { token } = req.query;

//   //Validate the Token
//   const user = await User.findOne({
//     resetToken: token,
//     resetTokenExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid or expired reset token.' });
//   }

//   // Render a password reset form
//   res.render('reset-password-form', { token });
// };


// //User enters New Password
// export const enterNewPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   //verifyToken (again)
//   const user = await User.findOne({
//     resetToken: token,
//     resetTokenExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid or expired reset token.' });
//   }

//   // Update Password
//   const hashedPassword = await hashPassword(newPassword);
//   user.password = hashedPassword;
//   user.resetToken = undefined;
//   user.resetTokenExpiry = undefined;
//   await user.save();

//   // Invalidate Token
//   res.json({ message: 'Password reset successful.' });
// };


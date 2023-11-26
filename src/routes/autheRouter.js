import express from "express";
import { uploaded } from "../middleWare/multer";
import { signup, login } from "../controller/authentication";
import { updatePassword, updateProfile } from "../controller/authentication/updateProfile";
import { authenticateUser, verifyToken } from "../middleWare";
import {
  enterNewPassword,
  forgotPassword,
} from "../controller/authentication/resetPassword";

import passport from "passport";

const authRouter = express.Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           description: User's password
 *         confirmPassword:
 *           type: string
 *           description: Confirmatory password
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         phone:
 *           type: number
 *           description: User's phone number
 *         userName:
 *           type: string
 *           description: User's username
 *         gender:
 *           type: string
 *           enum:
 *             - Male
 *             - Female
 *           description: User's gender
 *         profileImage:
 *           type: string
 *           description: URL to the user's profile image
 */

authRouter.post("/signup/", uploaded, signup);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: Enter password.
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request - Password and Confirm Password don't match
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Internal Server Error
 */

authRouter.post("/login", uploaded, login);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in as a registered user
 *     description: Log in using email and password credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: Enter password.
 *
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Bad Request - Wrong Password
 *       404:
 *         description: Conflict - User not found
 *       500:
 *         description: Internal Server Error
 */

authRouter.put("/updateAccount/:id",uploaded,verifyToken,updateProfile);
/**
 * @swagger
 * /auth/updateAccount/{id}:
 *   put:
 *     summary: Update User Profile
 *     description: Update the profile information for a user.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to be updated.
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: file
 *                 format: binary
 *                 description: Profile image for the user.
 *               firstName:
 *                 type: string
 *                 description: First name of the user.
 *               lastName:
 *                 type: string
 *                 description: Last name of the user.
 *               phone:
 *                 type: number
 *                 description: Phone number of the user.
 *               userName:
 *                 type: string
 *                 description: User name of the user.
 *               gender:
 *                 type: string
 *                 enum:
 *                   - Male
 *                   - Female
 *                 description: Gender of the user.
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       403:
 *         description: Unauthorized access.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */



authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

/**
 * @swagger
 * components:
 *   schemas:
 *     GoogleUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth authentication
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Redirect to Google for authentication
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback after Google OAuth authentication
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code received from Google
 *     responses:
 *       302:
 *         description: Redirect to the dashboard or home page
 *       401:
 *         description: Authentication failure, redirect to '/'
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


authRouter.post("/forgot-password",uploaded, forgotPassword);
authRouter.post("/enter-new-password",uploaded, enterNewPassword);

/**
 * @swagger
 * 
 * /auth/forgot-password:
 *   post:
 *     summary: Send OTP for password reset
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *             required:
 *               - phone
 *     responses:
 *       '201':
 *         description: OTP sent successfully
 *       '400':
 *         description: Bad Request. Invalid phone number provided.
 *       '404':
 *         description: Not Found. User not found.
 *       '500':
 *         description: Internal Server Error. Failed to send OTP.
 */

/**
 * @swagger
 * 
 * /auth/enter-new-password:
 *   post:
 *     summary: Reset password using OTP 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               otp:
 *                 type: string
 *                 description: One-time password sent to the user
 *               newPassword:
 *                 type: string
 *                 description: User's new password
 *             required:
 *               - phone
 *               - otp
 *               - newPassword
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *       '401':
 *         description: Unauthorized. Invalid OTP.
 *       '404':
 *         description: Not Found. User not found.
 *       '500':
 *         description: Internal Server Error.
 */







authRouter.put("/updatePassword",verifyToken, updatePassword);
/**
 * @swagger
 * /auth/updatePassword:
 *   put:
 *     summary: Update user password
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: New and current password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User password updated successfully
 *       401:
 *         description: Invalid access token or current password
 *       500:
 *         description: Internal server error
 */

export default authRouter;

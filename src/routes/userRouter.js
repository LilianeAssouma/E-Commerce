import express from "express";
import { uploaded } from "../middleWare/multer";
import { isAdmin, authenticateUser } from "../middleWare/authenticateUser";
import { verifyToken } from "../middleWare";
import { deleteUser, getAllUser, getUserProfile, getaUser, updateRole } from "../controller/userController";







const UserRouter = express.Router();

UserRouter.get("/viewUsers",verifyToken,isAdmin,getAllUser);
UserRouter.get("/viewaUser/:id",verifyToken,isAdmin,getaUser);
UserRouter.delete("/deleteaUser/:id",verifyToken,isAdmin,deleteUser);
UserRouter.put("/updateRole/:id",uploaded,verifyToken,isAdmin,updateRole);

/**
 * @swagger
 * /admin/viewUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page size
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Limit size
 *     responses:
 *       200:
 *         description: List of users
 *
 *       409:
 *         description: Unauthorized, token is missing or invalid
 *       403:
 *         description: Forbidden, the user does not have permission
 *       500:
 *         description: Internal server error
 *
 */


/**
 * @swagger
 * /admin/viewaUser/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to be retrieved.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User details.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */


/**
 * @swagger
 * /admin/deleteaUser/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to be deleted.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */


/**
 * @swagger
 * /admin/updateRole/{userId}:
 *   put:
 *     summary: Update User Role
 *     description: Update the role of a user.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to update the role.
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Object containing the updated role.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The new role for the user.
 *     responses:
 *       200:
 *         description: User role updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */


UserRouter.get("/viewProfile/",authenticateUser, getUserProfile);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized - User not authenticated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */





 export default UserRouter;
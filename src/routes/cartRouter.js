
import express from "express";
import {createCart, getUserCart, updateCart, removeItemFromCart, clearCart } from "../controller/cartCrtl";
import { authenticateUser } from "../middleWare";


const CartRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 */



 CartRouter.post("/addToCart", createCart);

/**
 * @swagger
 * /cart/addToCart:
 *   post:
 *     summary: Add items to the shopping cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to be added to the cart
 *               count:
 *                 type: number
 *                 description: The quantity of the product to be added
 *               color:
 *                 type: string
 *                 description: The color of the product
 *     responses:
 *       200:
 *         description: Cart details after adding items
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */



CartRouter.put("/updateCart/:userId",updateCart);

/**
 * @swagger
 * /cart/updateCart/{userId}:
 *   patch:
 *     summary: Update item count in the user's shopping cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               count:
 *                 type: number
 *             required:
 *               - productId
 *               - count
 *     responses:
 *       200:
 *         description: Updated user's shopping cart
 *       404:
 *         description: Cart not found for the user or item not found in the cart
 *       500:
 *         description: Internal server error
 */





CartRouter.get("/getUserCart/:userId", getUserCart);

/**
 * @swagger
 * /cart/getUserCart/{userId}:
 *   get:
 *     summary: Get user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User's shopping cart details
 *       404:
 *         description: Cart not found for the user
 *       500:
 *         description: Internal server error
 */



CartRouter.delete("/removeItem/:userId/:productId", removeItemFromCart);

/**
 * @swagger
 * /cart/removeItem/{userId}/{productId}:
 *   delete:
 *     summary: Remove an item from the shopping cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be removed from the cart
 *     responses:
 *       200:
 *         description: Cart details after removing item
 *       404:
 *         description: Cart or item not found
 *       500:
 *         description: Internal server error
 */



CartRouter.delete("/clearcart/:userId", clearCart);

/**
 * @swagger
 * /cart/clearCart/{userId}:
 *   delete:
 *     summary: Clear the entire shopping cart for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Cart not found for the user
 *       500:
 *         description: Internal server error
 */



export default CartRouter;
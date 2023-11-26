import express from "express";
import { addToWishlist, createProduct, deleteProduct, getAllProduct, rating, updateProduct, updateProductRating, viewOneProduct } from "../controller/productCrtl";
import { authenticateUser,isAdmin, uploaded, verifyToken } from "../middleWare";

const ProductRouter = express.Router();

ProductRouter.post("/create",uploaded,verifyToken,isAdmin, createProduct);
/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *               productImage:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: Array of product image URLsray of product colors
 *               categoryId:
 *                 type: string
 *                 description: ID of the category
 *     responses:
 *       '200':
 *         description: Successfully created a new product
 *       '404':
 *         description: Failed to save the product
 *       '500':
 *         description: Internal Server Error
 */

ProductRouter.put("/updateProduct/:id",uploaded,verifyToken,isAdmin, updateProduct);
/**
 * @swagger
 * /product/updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *                 required: true
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *               productImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of product image URLs
 *               categoryId:
 *                 type: string
 *                 description: ID of the category
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal Server Error
 */




ProductRouter.get("/viewAllProd",getAllProduct);
/**
 * @swagger
 * /product/viewAllProd:
 *   get:
 *     summary: Get all products
 *     tags: 
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: limit
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *         required: false
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of products
 *       '500':
 *         description: Internal Server Error
 */



 ProductRouter.get("/viewProd/:id",viewOneProduct);
/**
 * @swagger
 * 
 * paths:
 *   /product/viewProd/{id}:
 *     get:
 *       summary: View details of a specific product
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the product to view
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully retrieved the product details
 *         '500':
 *           description: Internal Server Error
 */

  ProductRouter.delete("/deleteProduct/:id",verifyToken,isAdmin, deleteProduct);

/**
 * @swagger
 *
 * paths:
 *   /product/deleteProduct/{id}:
 *     delete:
 *       summary: Delete a product by ID
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the product to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully deleted the product
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Internal Server Error
 */

  
  ProductRouter.post("/wishlist",verifyToken,addToWishlist);
  /**
 * @swagger
 * 
 * paths:
 *   /product/wishlist:
 *     post:
 *       summary: Add a product to the user's wishlist
 *       
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           description: ID of the product to rate
 *       requestBody:
 *         description: Wishlist operation details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - productId
 *       responses:
 *         '201':
 *           description: Wishlist updated successfully
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal Server Error
 */
      
  ProductRouter.post("/rating/:productId", verifyToken, rating);

/**
* @swagger
* 
* paths:
*   /product/rating/{productId}:
*     post:
*       summary: Rate a product
*       tags: [Products]
*       security:
*         - BearerAuth: []
*       parameters:
*         - in: path
*           name: productId
*           required: true
*           description: ID of the product to rate
*       requestBody:
*         description: Rating details
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 star:
*                   type: number
*                   description: The rating given by the user (between 1 and 5)
*                 comment:
*                   type: string
*                   description: Optional comment provided by the user
*       responses:
*         '201':
*           description: Product rated successfully
*         '400':
*           description: Bad Request. Invalid star rating.
*         '404':
*           description: Product not found
*         '500':
*           description: Internal Server Error
*/


ProductRouter.put("/updateRating/:productId",verifyToken, isAdmin, updateProductRating);
/**
 * @swagger
 * 
 * paths:
 *   /product/updateRating/{productId}:
 *     put:
 *       summary: Update the total rating of a product based on individual ratings
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           description: ID of the product to update the rating
 *       responses:
 *         '200':
 *           description: Product rating updated successfully
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Internal Server Error
 */





/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The product ID.
 *         productName:
 *           type: string
 *           description: The name of the product.
 *         slug:
 *           type: string
 *           description: The slug for creating clean, readable, and SEO-friendly URLs.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *         sold:
 *           type: number
 *           description: The number of units sold.
 *         productImage:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product image URLs.
 *         ratings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               star:
 *                 type: number
 *               comment:
 *                 type: string
 *               postedBy:
 *                 type: string
 *           description: Array of rating objects including star, comment, and postedBy.
 *         totalRating:
 *           type: string
 *           description: The total rating of the product.
 *         stock_quantity:
 *           type: number
 *           description: The stock quantity of the product.
 *         categoryId:
 *           type: string
 *           description: The category ID to which the product belongs.
 *       required:
 *         - productName
 *         - slug
 *         - description
 *         - price
 *         - brand
 *         - categoryId
 */



export default ProductRouter;
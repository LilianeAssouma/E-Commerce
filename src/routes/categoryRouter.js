import express from "express";
import { 
    deleteCategory, 
    getAllCategory, 
    getOneCategory,
    newCategory, 
    updateCategory,
 } from "../controller/prodCategoryCrtl";
 
import { uploaded } from "../middleWare";

const prodCategoryRouter = express.Router();

prodCategoryRouter.post('/create', uploaded, newCategory);

/**
 * @swagger
 * 
 * /category/create:
 *   post:
 *     summary: Create a new category.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: The name of the category
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the created category.
 *       '500':
 *         description: Internal server error.
 */

prodCategoryRouter.put("/update/:id",uploaded, updateCategory);
/**
 * @swagger
 * 
 * /category/update/{id}:
 *   put:
 *     summary: Update a category by ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the updated category.
 *       '500':
 *         description: Internal server error.
 */


prodCategoryRouter.delete("/delete/:id",deleteCategory);

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the deleted category.
 *       '500':
 *         description: Internal server error.
 */

prodCategoryRouter.get("/viewAll",getAllCategory);
/**
 * @swagger
 * /category/viewAll:
 *   get:
 *     summary: Get all categories with pagination.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for pagination.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation. Returns a list of categories.
 *       '500':
 *         description: Internal server error.
 */

prodCategoryRouter.get("/viewOne/:id",getOneCategory);

/**
 * @swagger
 * /category/viewOne/{id}:
 *   get:
 *     summary: Get one category by ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ViewOne Category.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieve. .
 *       '500':
 *         description: Internal server error.
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The category ID.
 *         name:
 *           type: string
 *           description: The name of the category.
 */
export default prodCategoryRouter;


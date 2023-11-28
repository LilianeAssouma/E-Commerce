import express from "express";

import authRouter from "./autheRouter";
import UserRouter from "./userRouter";
import { globalControllerHandler, handleNotFoundError } from "../middleWare/errorhandler";
import prodCategoryRouter from "./categoryRouter";
import ProductRouter from "./productRouter";
import CartRouter from "./cartRouter";


const mainRouter = express.Router();

mainRouter.use("/auth",authRouter);

mainRouter.use("/admin",UserRouter);

mainRouter.use("/category",prodCategoryRouter);

mainRouter.use("/product",ProductRouter);

mainRouter.use("/cart", CartRouter);

mainRouter.use(handleNotFoundError);  // Handling 404 errors


mainRouter.use (globalControllerHandler);   // Global error handler




export default mainRouter;
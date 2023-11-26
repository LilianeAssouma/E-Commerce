import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import mainRouter from "./src/routes";
import "dotenv/config";
import ProductRouter from "./src/routes/productRouter";

const port = 3005;
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use("/api/v1", mainRouter);
app.use("/product", ProductRouter);
// Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assouma api doc",
      version: "1.0.0",
      description: "E-Commerce apis doc",
      contact: {
        name: "Api",
        email: "lilyanassoum@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3005/api/v1",
      },

      {url: "https://e-commerce-sdvo.onrender.com/api/v1"},
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

mongoose.connect(process.env.DB_CONNECTION_PROD).then((res) => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

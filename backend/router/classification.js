import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const classificationRouter = express.Router();

// test rest api for specific routing point
// ex) /api/classification/women

classificationRouter.get(
  "/:gender",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      gender: req.params.gender,
    });
    if (products) {
      res.send(products);
    } else {
      res.status(404).send({ message: "product not found" });
    }
  })
);

// test rest api for specific routing point
// ex) /api/classification/women/shoes

classificationRouter.get(
  "/:gender/:category",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      gender: req.params.gender,
      category: req.params.category,
    });

    if (products) {
      res.send(products);
    } else {
      rse.status(404).send({ message: "product not found" });
    }
  })
);

export default classificationRouter;

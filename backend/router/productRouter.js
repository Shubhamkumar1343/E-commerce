import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

// for generating seed products information
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({})
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
  })
);

// for getting all products information
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    // .find function will return all occurrence of items
    const products = await Product.find({});
    res.send(products);
  })
);

// for getting a specific product information
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

// for creating a specific product in admin page
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "Edit Name" + Date.now(),
      image: "/images/p1.jpeg",
      price: 0,
      category: "Edit Category",
      brand: "Sample brand",
      countInStock: 0,
      rating: 3,
      numReviews: 3,
      description: "Edit Description",
      gender: "men",
      kids: false,
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

//for updating a specific product information in admin page
productRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;

    const productWillBeUpdated = await Product.findById(productId);
    if (productWillBeUpdated) {
      productWillBeUpdated.name = req.body.name;
      productWillBeUpdated.price = req.body.price;
      productWillBeUpdated.image = req.body.image;
      productWillBeUpdated.category = req.body.category;
      productWillBeUpdated.brand = req.body.brand;
      productWillBeUpdated.countInStock = req.body.countInStock;
      productWillBeUpdated.description = req.body.description;
      productWillBeUpdated.gender = req.body.gender;
      productWillBeUpdated.kids = req.body.kids;
      const updatedProduct = await productWillBeUpdated.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// for deleting a specific product in admin page
productRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// test rest api for specific routing point
// /api/users/category/:ee:dd
productRouter.get(
  "//:gender",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      gender: req.params.gender,
      category: req.params.category,
    });

    res.send(products);
  })
);

// test rest api routing point
// /api/users/category/:ee:dd
productRouter.get(
  "//:gender/:category",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      gender: req.params.gender,
      category: req.params.category,
    });

    res.send(products);
  })
);

export default productRouter;

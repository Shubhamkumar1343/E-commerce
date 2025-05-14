import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";
import uploadRouter from "./router/uploadRouter.js";
import classificationRouter from "./router/classification.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const uri = "your_api_uri_here";

mongoose.connect(
  "mongodb+srv://sukaransingh2003:gJt1CmBcDDIlF16K@cluster0.3tcf3qo.mongodb.net/" ||
    uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/placeorder", orderRouter);
app.use("/api/order", orderRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/classification", classificationRouter);
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

// error catcher.
// when error occur, expressAsyncHandler will redirect error to this middleware
// this middleware send error message to frontend side
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.resolve(process.cwd(), "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(process.cwd(), "frontend", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});

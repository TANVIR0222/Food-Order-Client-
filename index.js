const express = require("express");
const connectDB = require("./db/connectDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();





// middleware
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json({ limite: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

const { router } = require("./router/user.route");
const productRoute = require("./router/product.route");
const cartRouter = require("./router/cart.route");
const { favouriteRouter } = require("./router/favourite.route");
const {reviewRoutes} = require("./router/review.route");

// router
app.use("/api/auth", router);
app.use("/api/product", productRoute);
app.use("/api/product", cartRouter);
app.use("/api/product", favouriteRouter);
app.use("/api/review", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});




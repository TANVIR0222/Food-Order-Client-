const express = require("express");
const {
  getAllProductPaginations,
  productPost,
  searchProduct,
  getAllProductById,
  filterCategory,
  realtedProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/product.controller");

const router = express.Router();

router.get("/getProduct", getAllProductPaginations);
router.post("/productPost", productPost);
router.get("/search", searchProduct);
router.get("/products/:id", getAllProductById);
router.get("/filter", filterCategory);
router.get("/realtedProduct/:id", realtedProduct);
router.get("/allProduct", getAllProduct);
router.delete("/:id", deleteProduct);
router.patch("/update-product/:id", updateProduct);




module.exports = router;

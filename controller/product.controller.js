const Product = require("../model/product.model");

const productPost = async (req, res) => {
  try {
    const { name, recipe, price, category, rating , image } = req.body;

    const newItem = new Product({
      name,
      recipe,
      price,
      category,
      rating,
      image
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getAllProductPaginations
const getAllProductPaginations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find({})
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .exec();

    const total = await Product.countDocuments();

    res.status(200).json({
      products,
      totalPage: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "gat all product and Paginations faild" });
  }
};

// paginations
const searchProduct = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search in name
        { description: { $regex: query, $options: "i" } }, // Case-insensitive search in description
      ],
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching search results" });
  }
};

//
const getAllProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findById(id);
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ message: "Product Get Faild" });
    console.log(error);
  }
};
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ message: "Product Get Faild" });
    console.log(error);
  }
};

//
const filterCategory = async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category);

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// realted

const realtedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "post id is required" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).send({ message: "post  is Not found " });
    }

    const nameRegex = new RegExp(product.name.split(" ").join("|"), "i");

    const relatedQuery = {
      _id: { $ne: id }, //exclude the current blog by id
      name: { $regex: nameRegex },
    };

    const relatedProduct = await Product.find(relatedQuery);
    res.status(200).send({ message: "Related  Blog", relatedProduct });
  } catch (error) {
    console.log("Error fetching related post :", error);
    res.status(500).send({ message: "Error fetching related post" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "post id is required" });
    }
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "deleted Product not found" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    // if (!updateProduct) {
    //   res.status(404).send({ message: "Error Product Not Found " });
    // }

    res.status(201).send({ message: "update success full", updateProduct });
  } catch (error) {
    console.log(" Error update  Product  faild :", error);
    res.status(404).send({ message: "Error update  Product  faild " });
  }
};

module.exports = {
  productPost,
  getAllProductPaginations,
  searchProduct,
  getAllProductById,
  filterCategory,
  realtedProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
};

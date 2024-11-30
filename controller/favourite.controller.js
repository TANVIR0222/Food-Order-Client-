const Favourite = require("../model/favourite.model");

const favouriteCart = async (req, res) => {
  try {
    const { userId, productId, name, image, category, price } = req.body;
    const product = await Favourite.create({
      userId,
      productId,
      name,
      image,
      category,
      price,
    });
    res.status(201).json({ message: "Product added to cart", product });
  } catch (error) {
    res.status(404).json({ message: "Product added to faild", product });
  }
};

const favouriteCartGetById = async(req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Favvourite id is required" });
    }
    const favourite = await Favourite.find({ userId: id });
    res.status(200).json({ message: "Favvourite added to cart", favourite });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Favvourite added to faild" });
  }
};

const favouriteCartDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Favvourite id is required" });
    }

    const favourite = await Favourite.findByIdAndDelete(id);
    res.status(200).json({ message: "Favvourite added to Bin", favourite });
  } catch (error) {
    res.status(404).json({ message: "Favvourite added to bin faild" });
    console.log(error);
  }
};

module.exports = { favouriteCart, favouriteCartGetById ,favouriteCartDelete };

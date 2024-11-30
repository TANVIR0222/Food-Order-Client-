const { ReactReduxContext } = require("react-redux");
const Review = require("../model/review.model");

const reviewPost = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(500).json({ message: "All fild required" });
    }

    const newReview = await new Review({
      name,
      email,
      rating,
      message,
    });
    await newReview.save();
    res.status(201).json({ message: "Review posted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Review posted faild" ,err: error.message});
  }
};
const allreviewPost = async (req, res) => {
  try {
    const newReview = await Review.find({});
    res.status(201).json({ message: "Review posted successfully" ,newReview});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Review posted successfully" });
  }
};

module.exports = { reviewPost, allreviewPost };

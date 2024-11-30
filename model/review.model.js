
const { default: mongoose } = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
},{timestamps:true});

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;

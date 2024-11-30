const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "ok",
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    // author:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product; //export the model to use it in other files.  //export

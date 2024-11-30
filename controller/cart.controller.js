const Cart = require("../model/cart.model");
const Stripe = require("stripe");
const User = require("../model/user.model");
const Product = require("../model/product.model");
const Payment = require("../model/payment.model");
const cartProductPost = async (req, res) => {
  try {
    const { userId, productId, name, image, category, price } = req.body;
    const product = await Cart.create({
      userId,
      productId,
      name,
      image,
      category,
      price,
    });
    res.status(201).json({ message: "Product added to cart", product });
  } catch (error) {
    res.status(404).json({ message: "Product added to faild" });
  }
};
const allCart = async (req, res) => {
  try {
    // 12
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "User id is required" });
    }
    const cart = await Cart.find({ userId: id });
    // console.log(cart);

    const total = cart.reduce((acc, total) => acc + total.price, 0);
    // const formattedNumber = parseFloat(total).toFixed(2);
    // console.log(formattedNumber);

    res.status(201).json({ message: "Product added to cart", cart, total });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Product added to faild" });
  }
};

const cartDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Product id not Found" });
    }
    const cart = await Cart.findByIdAndDelete(id);
    res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(404).json({ message: "Product Delete to faild" });
    console.log(error);
  }
};

const getCheckOut = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "User id is required" });
    }

    const user = await User.findById(id);
    // console.log(user.id);

    const cart = await Cart.find({ userId: id });
    const total = cart.reduce((acc, total) => acc + total.price, 0);
    // const formattedNumber = Math.round(total.toFixed(2));
    // const formattedNumber = parseInt;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      customer_email: user?.email,
      client_reference_id: id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: parseInt(total * 100),
            product_data: {
              name: "Total Price",
              // recipy: '',
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = new Payment({
      userId: user.id,
      email: user.email,
      // image: user.profile,
      price: total,
    });

    // console.log(booking);

    await booking.save();

    res.status(201).json({message : 'success full' , session:session.url });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Product added to cart faild" });
  }
};

module.exports = { cartProductPost, allCart, cartDelete, getCheckOut };

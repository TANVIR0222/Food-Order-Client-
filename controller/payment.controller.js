const Payment = require("../model/payment.model");

const singleUserPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.find({ userId: id });
    res.status(201).json({ message: "payment success", produce: payment });
  } catch (error) {
    res.status(404).json({ message: "payment success" });
  }
};
//
const allPayments = async (req, res) => {
  try {
    const payment = await Payment.find({});
    res.status(201).json({ message: "payment success" , payment});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "payment success" });
  }
};

module.exports = {singleUserPayment,allPayments};

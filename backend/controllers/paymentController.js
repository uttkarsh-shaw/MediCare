const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Appointment = require("../models/Appointment");



const createOrder = async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: appointmentId,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};



const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
    } = req.body;

    const sign =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        paymentStatus: "paid",
        paymentId: razorpay_payment_id,
      }
    );

    res.status(200).json({
      message: "Payment successful",
    });

  } catch (error) {
    res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};



module.exports = {
  createOrder,
  verifyPayment,
};
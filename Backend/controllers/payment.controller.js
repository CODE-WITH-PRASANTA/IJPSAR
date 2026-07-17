const Payment = require("../models/payment.model");



// Get All Payments

const getPayments = async (req, res) => {
  try {

    const payments = await Payment.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// Create Payment

const createPayment = async (req, res) => {
  try {

    const {
      client,
      date,
      amount,
      method,
      status,
    } = req.body;

    const total = await Payment.countDocuments();

    const transactionId = `TXN-${1001 + total}`;

    const payment = await Payment.create({
      transactionId,
      client,
      date,
      amount,
      method,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Payment Added Successfully",
      payment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// Update Payment

const updatePayment = async (req, res) => {
  try {

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment Not Found",
      });
    }

    res.json({
      success: true,
      payment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// Delete Payment

const deletePayment = async (req, res) => {

  try {

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment Not Found",
      });
    }

    await payment.deleteOne();

    res.json({
      success: true,
      message: "Payment Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// Complete Payment

const completePayment = async (req, res) => {

  try {

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Completed",
      },
      {
        new: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment Not Found",
      });
    }

    res.json({
      success: true,
      payment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  completePayment,
};
const Transaction = require("../models/transaction.model");
const SubmitForm = require("../models/submitform.model");

/* ================= CREATE TRANSACTION ================= */

exports.createTransaction = async (req, res) => {
  try {
    const {
      paperId,
      amount,
      paymentMode,
      paymentMethod,
      transactionId,
    } = req.body;

    if (
      !paperId ||
      !amount ||
      !paymentMode ||
      !paymentMethod ||
      !transactionId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required",
      });
    }

    /* CHECK AUTHOR PAPER */

    const paper = await SubmitForm.findOne({
      _id: paperId,
      authorId: req.author.id,
    });

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found",
      });
    }

    /* CHECK EXISTING ACTIVE TRANSACTION */

    const existingTransaction = await Transaction.findOne({
      paperId,
      authorId: req.author.id,
      status: {
        $in: ["Pending Verification", "Received"],
      },
    });

    if (existingTransaction) {
      return res.status(400).json({
        success: false,
        message:
          "Transaction already submitted for this paper",
      });
    }

    const transaction = await Transaction.create({
      authorId: req.author.id,
      paperId,
      amount: Number(amount),
      paymentMode,
      paymentMethod,
      transactionId,
      paymentScreenshot: req.file.path,
      status: "Pending Verification",
    });

    return res.status(201).json({
      success: true,
      message:
        "Transaction submitted for verification",
      data: transaction,
    });
  } catch (error) {
    console.log("CREATE TRANSACTION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= AUTHOR TRANSACTIONS ================= */

exports.getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      authorId: req.author.id,
    })
      .populate(
        "paperId",
        "paperId paperTitle status"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ALL TRANSACTIONS ================= */

exports.getAllTransactions = async (req, res) => {
  try {
    const {
      status,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.transactionId = {
        $regex: search,
        $options: "i",
      };
    }

    const skip =
      (Number(page) - 1) * Number(limit);

    const transactions = await Transaction.find(query)
      .populate(
        "paperId",
        "paperId paperTitle status"
      )
      .populate(
        "authorId",
        "name email"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET SINGLE ================= */

exports.getSingleTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(
      req.params.id
    )
      .populate(
        "paperId",
        "paperId paperTitle status"
      )
      .populate(
        "authorId",
        "name email"
      );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= RECEIVE TRANSACTION ================= */

exports.receiveTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transaction.status !== "Pending Verification") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending transactions can be received",
      });
    }

    transaction.status = "Received";
    transaction.rejectionReason = "";
    transaction.verifiedAt = new Date();

    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Payment confirmed successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= REJECT TRANSACTION ================= */

exports.rejectTransaction = async (req, res) => {
  try {
    const { rejectionReason } = req.body;

    if (!rejectionReason?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const transaction = await Transaction.findById(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transaction.status !== "Pending Verification") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending transactions can be rejected",
      });
    }

    transaction.status = "Rejected";
    transaction.rejectionReason =
      rejectionReason.trim();

    transaction.rejectedAt = new Date();

    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Transaction rejected",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= RESUBMIT ================= */

exports.resubmitTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      authorId: req.author.id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transaction.status !== "Rejected") {
      return res.status(400).json({
        success: false,
        message:
          "Only rejected transactions can be resubmitted",
      });
    }

    const {
      amount,
      paymentMode,
      paymentMethod,
      transactionId,
    } = req.body;

    transaction.amount = Number(amount);
    transaction.paymentMode = paymentMode;
    transaction.paymentMethod = paymentMethod;
    transaction.transactionId = transactionId;

    if (req.file) {
      transaction.paymentScreenshot = req.file.path;
    }

    transaction.status = "Pending Verification";
    transaction.rejectionReason = "";
    transaction.rejectedAt = null;
    transaction.resubmittedAt = new Date();

    await transaction.save();

    return res.status(200).json({
      success: true,
      message:
        "Transaction resubmitted for verification",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
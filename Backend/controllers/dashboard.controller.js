const SubmitForm = require("../models/submitform.model");
const Transaction = require("../models/transaction.model");
const Editor = require("../models/editor.model");

const terminalPaperStatuses = ["Completed", "Published", "Rejected"];

exports.getDashboardOverview = async (req, res) => {
  try {
    const [
      totalSubmissions,
      pendingPapers,
      pendingPayments,
      publishedPapers,
      activeEditors,
      revenueResult,
      recentSubmissions,
      latestPublications,
      recentPayments,
    ] = await Promise.all([
      SubmitForm.countDocuments(),
      SubmitForm.countDocuments({
        status: { $nin: terminalPaperStatuses },
      }),
      Transaction.countDocuments({ status: "Pending Verification" }),
      SubmitForm.countDocuments({
        status: "Published",
        isPublished: true,
      }),
      Editor.countDocuments({ status: "Active" }),
      Transaction.aggregate([
        { $match: { status: "Received" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      SubmitForm.find()
        .select("paperId paperTitle status createdAt authors")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      SubmitForm.find({ status: "Published", isPublished: true })
        .select("paperId paperTitle publishedAt createdAt authors")
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(5)
        .lean(),
      Transaction.find({ status: "Received" })
        .select("amount paymentMethod transactionId verifiedAt createdAt paperId authorId")
        .populate("paperId", "paperId paperTitle")
        .populate("authorId", "fullName email")
        .sort({ verifiedAt: -1, createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalSubmissions,
          pendingPapers,
          pendingPayments,
          publishedPapers,
          activeEditors,
          revenue: revenueResult[0]?.total || 0,
        },
        recentSubmissions,
        latestPublications,
        recentPayments,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("DASHBOARD OVERVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard data",
    });
  }
};

const EditorialBoard = require("../models/editorialboard.models");

// ======================
// CREATE MEMBER
// ======================
exports.createMember = async (req, res) => {
  try {
    const member = await EditorialBoard.create({
      ...req.body,
      profileImage: req.body.profileImage || "",
    });

    res.status(201).json({
      success: true,
      message: "Editorial Board Member Created Successfully",
      data: member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ======================
// GET ALL MEMBERS (Admin)
// ======================
exports.getMembers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const query = {
      name: {
        $regex: search,
        $options: "i",
      },
    };

    const total = await EditorialBoard.countDocuments(query);

    const members = await EditorialBoard.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data: members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCategoryWiseMembers = async (req, res) => {
  try {
    const members = await EditorialBoard.find({
      status: true,
    }).sort({ createdAt: -1 });

    const groupedData = {
      "Patron & Management": [],
      "Editor-in-Chief": [],
      "International Editorial Advisory Board": [],
      "Editorial Board": [],
    };

    members.forEach((member) => {
      const category = member.category?.trim();

      if (groupedData[category]) {
        groupedData[category].push(member);
      }
    });

    res.status(200).json({
      success: true,
      data: groupedData,
    });
  } catch (err) {
    console.log(err);   // VERY IMPORTANT
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ======================
// GET SINGLE MEMBER
// ======================
exports.getMember = async (req, res) => {
  try {
    const member = await EditorialBoard.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// UPDATE MEMBER
// ======================
exports.updateMember = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.body.profileImage) {
      updateData.profileImage = req.body.profileImage;
    }

    const member = await EditorialBoard.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member Updated Successfully",
      data: member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// DELETE MEMBER
// ======================
exports.deleteMember = async (req, res) => {
  try {
    const member = await EditorialBoard.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// CHANGE STATUS
// ======================
exports.changeStatus = async (req, res) => {
  try {
    const member = await EditorialBoard.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    member.status = !member.status;

    await member.save();

    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      data: member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

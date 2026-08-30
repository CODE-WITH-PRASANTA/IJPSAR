
const EditorialBoard = require("../models/editorialboard.models");

// =====================================================
// CREATE MEMBER
// =====================================================

exports.createMember = async (req, res) => {
  try {
    console.log(
      "EDITORIAL BOARD CREATE BODY:",
      req.body
    );

    const member = await EditorialBoard.create({
      name: req.body.name || "",
      designation: req.body.designation || "",
      institution: req.body.institution || "",

      category:
        req.body.category ||
        "Editorial Board",

      email: req.body.email || "",
      phone: req.body.phone || "",

      // ORCID
      orcid:
        req.body.orcid ||
        req.body.ORCID ||
        req.body.orcidId ||
        "",

      biography:
        req.body.biography || "",

      // Tags can arrive as JSON string
      tags:
        typeof req.body.tags === "string"
          ? (() => {
              try {
                return JSON.parse(req.body.tags);
              } catch {
                return [];
              }
            })()
          : Array.isArray(req.body.tags)
            ? req.body.tags
            : [],

      profileImage:
        req.body.profileImage || "",

      status:
        req.body.status !== undefined
          ? req.body.status
          : true,
    });

    return res.status(201).json({
      success: true,
      message:
        "Editorial Board Member Created Successfully",
      data: member,
    });

  } catch (err) {
    console.error(
      "CREATE MEMBER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================================
// GET ALL MEMBERS (ADMIN)
// =====================================================

exports.getMembers = async (req, res) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const search =
      req.query.search || "";

    const query = {
      name: {
        $regex: search,
        $options: "i",
      },
    };

    const total =
      await EditorialBoard.countDocuments(
        query
      );

    const members =
      await EditorialBoard.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    return res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data: members,
    });

  } catch (err) {
    console.error(
      "GET MEMBERS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================================
// GET CATEGORY-WISE MEMBERS
// =====================================================

exports.getCategoryWiseMembers = async (
  req,
  res
) => {
  try {
    const members =
      await EditorialBoard.find({
        status: true,
      }).sort({
        createdAt: -1,
      });

    const groupedData = {
      "Patron & Management": [],
      "Editor-in-Chief": [],
      "International Editorial Advisory Board": [],
      "Editorial Board": [],
    };

    members.forEach((member) => {
      const category =
        member.category?.trim();

      if (groupedData[category]) {
        groupedData[category].push(
          member
        );
      }
    });

    return res.status(200).json({
      success: true,
      data: groupedData,
    });

  } catch (err) {
    console.error(
      "GET CATEGORY MEMBERS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================================
// GET SINGLE MEMBER
// =====================================================

exports.getMember = async (
  req,
  res
) => {
  try {
    const member =
      await EditorialBoard.findById(
        req.params.id
      );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: member,
    });

  } catch (err) {
    console.error(
      "GET MEMBER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================================
// UPDATE MEMBER
// =====================================================

exports.updateMember = async (
  req,
  res
) => {
  try {
    console.log(
      "EDITORIAL BOARD UPDATE BODY:",
      req.body
    );

    const updateData = {};

    // =================================================
    // BASIC INFORMATION
    // =================================================

    if (req.body.name !== undefined) {
      updateData.name =
        req.body.name;
    }

    if (
      req.body.designation !==
      undefined
    ) {
      updateData.designation =
        req.body.designation;
    }

    if (
      req.body.institution !==
      undefined
    ) {
      updateData.institution =
        req.body.institution;
    }

    // =================================================
    // CATEGORY
    // =================================================

    if (
      req.body.category !==
      undefined
    ) {
      updateData.category =
        req.body.category;
    }

    // =================================================
    // CONTACT
    // =================================================

    if (req.body.email !== undefined) {
      updateData.email =
        req.body.email;
    }

    if (req.body.phone !== undefined) {
      updateData.phone =
        req.body.phone;
    }

    // =================================================
    // ORCID
    // =================================================

    if (req.body.orcid !== undefined) {
      updateData.orcid =
        req.body.orcid;
    } else if (
      req.body.ORCID !== undefined
    ) {
      updateData.orcid =
        req.body.ORCID;
    } else if (
      req.body.orcidId !== undefined
    ) {
      updateData.orcid =
        req.body.orcidId;
    }

    // =================================================
    // BIOGRAPHY
    // =================================================

    if (
      req.body.biography !==
      undefined
    ) {
      updateData.biography =
        req.body.biography;
    }

    // =================================================
    // TAGS
    // =================================================

    if (req.body.tags !== undefined) {

      if (
        typeof req.body.tags ===
        "string"
      ) {
        try {
          updateData.tags =
            JSON.parse(
              req.body.tags
            );
        } catch {
          updateData.tags = [];
        }
      } else if (
        Array.isArray(
          req.body.tags
        )
      ) {
        updateData.tags =
          req.body.tags;
      }
    }

    // =================================================
    // PROFILE IMAGE
    // =================================================

    if (
      req.body.profileImage !==
      undefined
    ) {
      updateData.profileImage =
        req.body.profileImage;
    }

    // =================================================
    // STATUS
    // =================================================

    if (
      req.body.status !==
      undefined
    ) {
      updateData.status =
        req.body.status;
    }

    // =================================================
    // UPDATE DATABASE
    // =================================================

    const member =
      await EditorialBoard.findByIdAndUpdate(
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

    return res.status(200).json({
      success: true,
      message:
        "Member Updated Successfully",
      data: member,
    });

  } catch (err) {
    console.error(
      "UPDATE MEMBER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================================
// DELETE MEMBER
// =====================================================

exports.deleteMember = async (
  req,
  res
) => {
  try {
    const member =
      await EditorialBoard.findByIdAndDelete(
        req.params.id
      );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Member Deleted Successfully",
    });

  } catch (err) {
    console.error(
      "DELETE MEMBER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================================
// CHANGE STATUS
// =====================================================

exports.changeStatus = async (
  req,
  res
) => {
  try {
    const member =
      await EditorialBoard.findById(
        req.params.id
      );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    member.status =
      !member.status;

    await member.save();

    return res.status(200).json({
      success: true,
      message:
        "Status Updated Successfully",
      data: member,
    });

  } catch (err) {
    console.error(
      "CHANGE STATUS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


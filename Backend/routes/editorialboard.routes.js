const express = require("express");
const router = express.Router();

const { upload, convertToWebp } = require("../middlewares/upload");

const {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
  changeStatus,
  getCategoryWiseMembers
} = require("../controllers/editorialboard.controller");
router.post(
  "/create",
  upload.single("profileImage"),
  convertToWebp,
  createMember
);

router.get("/all", getMembers);

// Put this BEFORE /:id
router.get("/category-wise", getCategoryWiseMembers);

router.get("/:id", getMember);

router.put(
  "/update/:id",
  upload.single("profileImage"),
  convertToWebp,
  updateMember
);

router.delete("/delete/:id", deleteMember);

router.patch("/status/:id", changeStatus);

module.exports = router;
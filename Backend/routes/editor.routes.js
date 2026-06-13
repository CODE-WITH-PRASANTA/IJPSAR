const express = require("express");

const router = express.Router();

const {
  createEditor,
  loginEditor,
  getAllEditors,
  getSingleEditor,
  updateEditor,
  deleteEditor,
  blockEditor,
  activateEditor,
} = require("../controllers/editor.controller");

router.post(
  "/create",
  createEditor
);

router.post(
  "/login",
  loginEditor
);

router.get(
  "/all",
  getAllEditors
);

router.get(
  "/:id",
  getSingleEditor
);

router.put(
  "/update/:id",
  updateEditor
);

router.put(
  "/block/:id",
  blockEditor
);

router.put(
  "/activate/:id",
  activateEditor
);

router.delete(
  "/delete/:id",
  deleteEditor
);

module.exports = router;
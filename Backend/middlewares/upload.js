const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/* =========================================================
   HELPERS
========================================================= */

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }
};

/* =========================================================
   ROUTE → FOLDER MAP
========================================================= */

const routeFolderMap = {
  "/index": "uploads/index",
  "/submitform": "uploads/submitform",
  "/editorialboard": "uploads/editorialboard",
  "/editor": "uploads/editor",
};

/* =========================================================
   GET UPLOAD PATH
========================================================= */

const getUploadPath = (req) => {
  let uploadPath = "uploads/common";

  for (const route in routeFolderMap) {
    if (req.originalUrl.includes(route)) {
      uploadPath = routeFolderMap[route];
      break;
    }
  }

  ensureDir(uploadPath);

  return uploadPath;
};

/* =========================================================
   MULTER STORAGE
========================================================= */

const storage = multer.memoryStorage();

/* =========================================================
   MIME TYPES (Expanded to support generic browser streams)
========================================================= */

const MIME_TYPES = {
  /* ================= IMAGE ================= */
<<<<<<< HEAD

  JPG: ["image/jpeg", "image/jpg"],
=======
  JPG: [
    "image/jpeg",
    "image/jpg",
  ],
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

  PNG: ["image/png"],

  /* ================= PDF ================= */
<<<<<<< HEAD

  PDF: ["application/pdf"],

  /* ================= WORD ================= */

  DOC: ["application/msword"],
=======
  PDF: [
    "application/pdf",
  ],

  /* ================= WORD ================= */
  DOC: [
    "application/msword",
    "application/octet-stream",
  ],
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

  DOCX: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
    "application/zip",
  ],

  /* ================= ZIP ================= */
<<<<<<< HEAD

  ZIP: ["application/zip", "application/x-zip-compressed", "multipart/x-zip"],
=======
  ZIP: [
    "application/zip",
    "application/x-zip-compressed",
    "multipart/x-zip",
  ],
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
};

/* =========================================================
   FILE TYPE HELPERS
========================================================= */

const isImage = (mime) => {
  return mime.startsWith("image/");
};

const isPDF = (mime) => {
  return MIME_TYPES.PDF.includes(mime);
};

const isDOC = (mime) => {
  return MIME_TYPES.DOC.includes(mime);
};

const isDOCX = (mime) => {
  return MIME_TYPES.DOCX.includes(mime);
};

const isZIP = (mime) => {
  return MIME_TYPES.ZIP.includes(mime);
};

const isJPG = (mime) => {
  return MIME_TYPES.JPG.includes(mime);
};

const isPNG = (mime) => {
  return MIME_TYPES.PNG.includes(mime);
};

/* =========================================================
   PUBLICATION FILE VALIDATION
========================================================= */

<<<<<<< HEAD
const validatePublicationFile = (field, mime) => {
=======
const validatePublicationFile = (
  field,
  file
) => {
  const mime = file.mimetype || "";
  const ext = path.extname(file.originalname).toLowerCase();

>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
  /* =======================================================
     ACCEPTANCE LETTER (PDF ONLY)
  ======================================================= */

  if (field === "acceptanceLetter") {
<<<<<<< HEAD
    return isPDF(mime) ? null : "Acceptance Letter must be a PDF file.";
=======
    return (isPDF(mime) || ext === ".pdf")
      ? null
      : "Acceptance Letter must be a PDF file.";
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
  }

  /* =======================================================
     GALLEY PROOF (PDF ONLY)
  ======================================================= */

  if (field === "galleyProof") {
<<<<<<< HEAD
    return isPDF(mime) ? null : "Galley Proof must be a PDF file.";
  }
  /* =======================================================
   REVIEW REPORT

   PDF ONLY
======================================================= */

  if (field === "reviewReport") {
    return isPDF(mime) ? null : "Review Report must be a PDF file.";
  }

  /* =======================================================
   COPYRIGHT FORM (Editor's version)

   PDF ONLY
======================================================= */

  if (field === "copyrightForm") {
    return isPDF(mime) ? null : "Copyright Form must be a PDF file.";
  }
  /* =======================================================
     CORRECTED GALLEY PROOF

     PDF ONLY
  ======================================================= */

  if (field === "correctedGalleyProof") {
    return isPDF(mime) ? null : "Corrected Galley Proof must be a PDF file.";
=======
    return (isPDF(mime) || ext === ".pdf")
      ? null
      : "Galley Proof must be a PDF file.";
  }

  /* =======================================================
     CORRECTED GALLEY PROOF (PDF ONLY)
  ======================================================= */

  if (field === "correctedGalleyProof") {
    return (isPDF(mime) || ext === ".pdf")
      ? null
      : "Corrected Galley Proof must be a PDF file.";
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
  }

  /* =======================================================
     COPYRIGHT TRANSFER FORM (PDF / DOC / DOCX)
  ======================================================= */

  if (field === "copyrightTransferForm") {
<<<<<<< HEAD
    if (isPDF(mime) || isDOC(mime) || isDOCX(mime)) {
=======
    if (
      isPDF(mime) ||
      isDOC(mime) ||
      isDOCX(mime) ||
      ext === ".pdf" ||
      ext === ".doc" ||
      ext === ".docx"
    ) {
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
      return null;
    }

    return "Copyright Transfer Form must be a PDF, DOC, or DOCX file.";
  }

  /* =======================================================
     PUBLICATION FEE PAYMENT PROOF (PDF / JPG / PNG)
  ======================================================= */

  if (
    field === "publicationFeePaymentProof" ||
    field === "publicationFeeProof"
  ) {
<<<<<<< HEAD
    if (isPDF(mime) || isJPG(mime) || isPNG(mime)) {
=======
    if (
      isPDF(mime) ||
      isJPG(mime) ||
      isPNG(mime) ||
      ext === ".pdf" ||
      ext === ".jpg" ||
      ext === ".jpeg" ||
      ext === ".png"
    ) {
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
      return null;
    }

    return "Publication Fee Payment Proof must be PDF, JPG, or PNG.";
  }

  /* =======================================================
     AUTHOR PHOTOGRAPHS (JPG / PNG)
  ======================================================= */

  if (field === "authorPhotographs") {
<<<<<<< HEAD
    if (isJPG(mime) || isPNG(mime)) {
=======
    if (
      isJPG(mime) ||
      isPNG(mime) ||
      ext === ".jpg" ||
      ext === ".jpeg" ||
      ext === ".png"
    ) {
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
      return null;
    }

    return "Author Photograph must be JPG or PNG.";
  }

  /* =======================================================
     ADDITIONAL SUPPORTING FILES (PDF / DOC / DOCX / ZIP)
  ======================================================= */

<<<<<<< HEAD
  if (field === "additionalSupportingFiles") {
    if (isPDF(mime) || isDOC(mime) || isDOCX(mime) || isZIP(mime)) {
=======
  if (
    field === "additionalSupportingFiles"
  ) {
    if (
      isPDF(mime) ||
      isDOC(mime) ||
      isDOCX(mime) ||
      isZIP(mime) ||
      ext === ".pdf" ||
      ext === ".doc" ||
      ext === ".docx" ||
      ext === ".zip"
    ) {
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
      return null;
    }

    return "Supporting files must be PDF, DOC, DOCX, or ZIP.";
  }

  return null;
};

/* =========================================================
   FILE FILTER
========================================================= */

<<<<<<< HEAD
const fileFilter = (req, file, cb) => {
  const route = req.originalUrl || "";

  const mime = file.mimetype || "";

  const field = file.fieldname || "";
=======
const fileFilter = (
  req,
  file,
  cb
) => {
  const route = req.originalUrl || "";
  const mime = file.mimetype || "";
  const field = file.fieldname || "";
  const ext = path.extname(file.originalname).toLowerCase();
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

  /* =======================================================
     FINAL PUBLICATION WORKFLOW
  ======================================================= */

<<<<<<< HEAD
  if (route.includes("/publication/") || route.includes("/accept/")) {
    const publicationError = validatePublicationFile(field, mime);
=======
  if (
    route.includes("/publication/")
  ) {
    const publicationError =
      validatePublicationFile(
        field,
        file
      );
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

    if (publicationError) {
      return cb(new Error(publicationError));
    }

    return cb(null, true);
  }

  /* =======================================================
     STUDENT VALIDATION
  ======================================================= */

<<<<<<< HEAD
  if (route.includes("/students")) {
=======
  if (
    route.includes("/students")
  ) {
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
    const imageFields = [
      "studentPhoto",
      "fatherPhoto",
      "motherPhoto",
      "guardianPhoto",
    ];

    const pdfFields = [
      "reportCard",
      "tc",
      "samagraId",
      "nidaCard",
      "previousMarksheet",
      "dobCertificate",
      "incomeCertificate",
      "pip",
    ];

    const pdfOrImageFields = ["aadhaarStudent", "aadhaarParent"];

<<<<<<< HEAD
    /* =====================================================
       IMAGE FIELDS
    ===================================================== */

    if (imageFields.includes(field)) {
      return isImage(mime)
=======
    if (
      imageFields.includes(field)
    ) {
      return (isImage(mime) || [".jpg", ".jpeg", ".png"].includes(ext))
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
        ? cb(null, true)
        : cb(new Error(`${field} must be an image`));
    }

<<<<<<< HEAD
    /* =====================================================
       PDF FIELDS
    ===================================================== */

    if (pdfFields.includes(field)) {
      return isPDF(mime)
=======
    if (
      pdfFields.includes(field)
    ) {
      return (isPDF(mime) || ext === ".pdf")
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
        ? cb(null, true)
        : cb(new Error(`${field} must be a PDF`));
    }

<<<<<<< HEAD
    /* =====================================================
       PDF OR IMAGE
    ===================================================== */

    if (pdfOrImageFields.includes(field)) {
      return isPDF(mime) || isImage(mime)
=======
    if (
      pdfOrImageFields.includes(field)
    ) {
      return (
        isPDF(mime) ||
        isImage(mime) ||
        [".pdf", ".jpg", ".jpeg", ".png"].includes(ext)
      )
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
        ? cb(null, true)
        : cb(new Error(`${field} must be PDF or image`));
    }
  }

  /* =========================================================
     DEFAULT VALIDATION
  ========================================================= */

<<<<<<< HEAD
  if (isImage(mime) || isPDF(mime) || isDOC(mime) || isDOCX(mime)) {
    return cb(null, true);
=======
  if (
    isImage(mime) ||
    isPDF(mime) ||
    isDOC(mime) ||
    isDOCX(mime) ||
    [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"].includes(ext)
  ) {
    return cb(
      null,
      true
    );
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
  }

  return cb(new Error("Only images, PDF, DOC, DOCX files are allowed."));
};

/* =========================================================
   MULTER INSTANCE
========================================================= */

const upload = multer({
  storage,

  fileFilter,

  limits: {
<<<<<<< HEAD
    /*
     * Maximum file size:
     * 100 MB
     */

=======
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
    fileSize: 100 * 1024 * 1024,
  },
});

/* =========================================================
   PROCESS FILE
========================================================= */

<<<<<<< HEAD
const processFile = async (file, uploadPath) => {
  const mime = file.mimetype || "";

  /* =======================================================
     IMAGE

     JPG / PNG → WEBP

     Existing behavior preserved.
  ======================================================= */

  if (isImage(mime)) {
    const filename = `${file.fieldname}_${Date.now()}_${Math.round(
      Math.random() * 100000,
    )}.webp`;

    const outputPath = path.join(uploadPath, filename);
=======
const processFile = async (
  file,
  uploadPath
) => {
  const mime = file.mimetype || "";
  const ext = path.extname(file.originalname).toLowerCase();

  if (isImage(mime) || [".jpg", ".jpeg", ".png"].includes(ext)) {
    const filename =
      `${file.fieldname}_${Date.now()}_${Math.round(
        Math.random() * 100000
      )}.webp`;

    const outputPath =
      path.join(
        uploadPath,
        filename
      );
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

    await sharp(file.buffer)
      .resize(1200, 1200, {
        fit: "inside",
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    return "/" + outputPath.replace(/\\/g, "/");
  }

<<<<<<< HEAD
  /* =======================================================
     DOCUMENT

     PDF
     DOC
     DOCX
     ZIP

     Documents are NOT converted to WebP.
  ======================================================= */

  const ext = path.extname(file.originalname).toLowerCase();

  const safeExtension = ext || ".bin";
=======
  const safeExtension =
    ext || ".bin";
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

  const filename = `${file.fieldname}_${Date.now()}_${Math.round(
    Math.random() * 100000,
  )}${safeExtension}`;

  const outputPath = path.join(uploadPath, filename);

  fs.writeFileSync(outputPath, file.buffer);

  return "/" + outputPath.replace(/\\/g, "/");
};

/* =========================================================
   FILE PROCESSOR
========================================================= */

<<<<<<< HEAD
const convertToWebp = async (req, res, next) => {
  try {
    /* =====================================================
       NO FILE
    ===================================================== */

    if (!req.file && !req.files) {
      return next();
    }

    /* =====================================================
       UPLOAD DIRECTORY
    ===================================================== */

    const uploadPath = getUploadPath(req);
=======
const convertToWebp = async (
  req,
  res,
  next
) => {
  try {
    if (
      !req.file &&
      !req.files
    ) {
      return next();
    }

    const uploadPath =
      getUploadPath(req);
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

    if (req.file) {
<<<<<<< HEAD
      const pathSaved = await processFile(req.file, uploadPath);

      /*
       * Save path to multer object.
       */

      req.file.path = pathSaved;

      /*
       * Save path to request body.
       */

      req.body[req.file.fieldname] = pathSaved;
=======
      const pathSaved =
        await processFile(
          req.file,
          uploadPath
        );

      req.file.path =
        pathSaved;

      req.body[
        req.file.fieldname
      ] = pathSaved;
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

      console.log("FILE SAVED:", pathSaved);
    }

    if (req.files) {
<<<<<<< HEAD
      for (const field in req.files) {
        const uploadedFiles = [];

        for (const file of req.files[field]) {
          const pathSaved = await processFile(file, uploadPath);

          file.path = pathSaved;

          uploadedFiles.push(pathSaved);
        }

        /* ================================================
           SINGLE FILE
        ================================================ */

        if (uploadedFiles.length === 1) {
          req.body[field] = uploadedFiles[0];
        } else {
          /* ==============================================
             MULTIPLE FILES
          ============================================== */

          req.body[field] = uploadedFiles;
=======
      for (
        const field in req.files
      ) {
        const uploadedFiles =
          [];

        for (
          const file of
          req.files[field]
        ) {
          const pathSaved =
            await processFile(
              file,
              uploadPath
            );

          file.path =
            pathSaved;

          uploadedFiles.push(
            pathSaved
          );
        }

        if (
          uploadedFiles.length === 1
        ) {
          req.body[field] =
            uploadedFiles[0];
        } else {
          req.body[field] =
            uploadedFiles;
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
        }
      }
    }

    next();
  } catch (err) {
<<<<<<< HEAD
    console.error("UPLOAD ERROR:", err);

    return res.status(500).json({
      success: false,

      message: err.message || "File upload failed.",
=======
    console.error(
      "UPLOAD ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "File upload failed.",
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
    });
  }
};

/* =========================================================
   DELETE FILE
========================================================= */

<<<<<<< HEAD
const deleteImageFile = (imagePath) => {
=======
const deleteImageFile = (
  imagePath
) => {
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
  try {
    if (!imagePath) {
      return;
    }

<<<<<<< HEAD
    /*
     * Remove leading slash.
     *
     * Example:
     *
     * /uploads/submitform/file.pdf
     *
     * becomes:
     *
     * uploads/submitform/file.pdf
     */

    const cleanPath = imagePath.replace(/^\/+/, "");
=======
    const cleanPath =
      imagePath.replace(
        /^\/+/,
        ""
      );
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240

    const fullPath = path.join(__dirname, "..", cleanPath);

<<<<<<< HEAD
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);

      console.log("Deleted:", fullPath);
=======
    if (
      fs.existsSync(fullPath)
    ) {
      fs.unlinkSync(
        fullPath
      );

      console.log(
        "Deleted:",
        fullPath
      );
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
    }
  } catch (err) {
<<<<<<< HEAD
    console.error("DELETE ERROR:", err);
=======
    console.error(
      "DELETE ERROR:",
      err
    );
>>>>>>> 5e5e221369f78495de3988185772ed3b05b7f240
  }
};

/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  upload,
  convertToWebp,
  deleteImageFile,
};

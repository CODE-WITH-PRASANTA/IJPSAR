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
   MIME TYPES
========================================================= */

const MIME_TYPES = {
  /* ================= IMAGE ================= */

  JPG: [
    "image/jpeg",
    "image/jpg",
  ],

  PNG: [
    "image/png",
  ],

  /* ================= PDF ================= */

  PDF: [
    "application/pdf",
  ],

  /* ================= WORD ================= */

  DOC: [
    "application/msword",
  ],

  DOCX: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],

  /* ================= ZIP ================= */

  ZIP: [
    "application/zip",
    "application/x-zip-compressed",
    "multipart/x-zip",
  ],
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

const validatePublicationFile = (
  field,
  mime
) => {

  /* =======================================================
     ACCEPTANCE LETTER

     PDF ONLY
  ======================================================= */

  if (field === "acceptanceLetter") {
    return isPDF(mime)
      ? null
      : "Acceptance Letter must be a PDF file.";
  }

  /* =======================================================
     GALLEY PROOF

     PDF ONLY
  ======================================================= */

  if (field === "galleyProof") {
    return isPDF(mime)
      ? null
      : "Galley Proof must be a PDF file.";
  }

  /* =======================================================
     CORRECTED GALLEY PROOF

     PDF ONLY
  ======================================================= */

  if (field === "correctedGalleyProof") {
    return isPDF(mime)
      ? null
      : "Corrected Galley Proof must be a PDF file.";
  }

  /* =======================================================
     COPYRIGHT TRANSFER FORM

     PDF / DOC / DOCX

     UPDATED
  ======================================================= */

  if (field === "copyrightTransferForm") {
    if (
      isPDF(mime) ||
      isDOC(mime) ||
      isDOCX(mime)
    ) {
      return null;
    }

    return (
      "Copyright Transfer Form must be a PDF, DOC, or DOCX file."
    );
  }

  /* =======================================================
     PUBLICATION FEE PAYMENT PROOF

     PDF / JPG / PNG

     IMPORTANT:
     Frontend field is:
     publicationFeePaymentProof
  ======================================================= */

  if (
    field === "publicationFeePaymentProof" ||
    field === "publicationFeeProof"
  ) {
    if (
      isPDF(mime) ||
      isJPG(mime) ||
      isPNG(mime)
    ) {
      return null;
    }

    return (
      "Publication Fee Payment Proof must be PDF, JPG, or PNG."
    );
  }

  /* =======================================================
     AUTHOR PHOTOGRAPHS

     JPG / PNG
  ======================================================= */

  if (field === "authorPhotographs") {
    if (
      isJPG(mime) ||
      isPNG(mime)
    ) {
      return null;
    }

    return (
      "Author Photograph must be JPG or PNG."
    );
  }

  /* =======================================================
     ADDITIONAL SUPPORTING FILES

     PDF / DOC / DOCX / ZIP
  ======================================================= */

  if (
    field === "additionalSupportingFiles"
  ) {
    if (
      isPDF(mime) ||
      isDOC(mime) ||
      isDOCX(mime) ||
      isZIP(mime)
    ) {
      return null;
    }

    return (
      "Supporting files must be PDF, DOC, DOCX, or ZIP."
    );
  }

  /* =======================================================
     UNKNOWN PUBLICATION FIELD

     Don't block it here.
  ======================================================= */

  return null;
};

/* =========================================================
   FILE FILTER
========================================================= */

const fileFilter = (
  req,
  file,
  cb
) => {

  const route =
    req.originalUrl || "";

  const mime =
    file.mimetype || "";

  const field =
    file.fieldname || "";

  /* =======================================================
     FINAL PUBLICATION WORKFLOW

     Publication files have their own validation.
  ======================================================= */

  if (
    route.includes("/publication/")
  ) {

    const publicationError =
      validatePublicationFile(
        field,
        mime
      );

    if (publicationError) {
      return cb(
        new Error(
          publicationError
        )
      );
    }

    return cb(
      null,
      true
    );
  }

  /* =======================================================
     STUDENT VALIDATION
  ======================================================= */

  if (
    route.includes("/students")
  ) {

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

    const pdfOrImageFields = [
      "aadhaarStudent",
      "aadhaarParent",
    ];

    /* =====================================================
       IMAGE FIELDS
    ===================================================== */

    if (
      imageFields.includes(field)
    ) {

      return isImage(mime)
        ? cb(null, true)
        : cb(
            new Error(
              `${field} must be an image`
            )
          );
    }

    /* =====================================================
       PDF FIELDS
    ===================================================== */

    if (
      pdfFields.includes(field)
    ) {

      return isPDF(mime)
        ? cb(null, true)
        : cb(
            new Error(
              `${field} must be a PDF`
            )
          );
    }

    /* =====================================================
       PDF OR IMAGE
    ===================================================== */

    if (
      pdfOrImageFields.includes(field)
    ) {

      return (
        isPDF(mime) ||
        isImage(mime)
      )
        ? cb(null, true)
        : cb(
            new Error(
              `${field} must be PDF or image`
            )
          );
    }
  }

  /* =========================================================
     DEFAULT VALIDATION

     Existing normal uploads:

     IMAGE
     PDF
     DOC
     DOCX
  ========================================================= */

  if (
    isImage(mime) ||
    isPDF(mime) ||
    isDOC(mime) ||
    isDOCX(mime)
  ) {

    return cb(
      null,
      true
    );
  }

  return cb(
    new Error(
      "Only images, PDF, DOC, DOCX files are allowed."
    )
  );
};

/* =========================================================
   MULTER INSTANCE
========================================================= */

const upload = multer({
  storage,

  fileFilter,

  limits: {
    /*
     * Maximum file size:
     * 100 MB
     */

    fileSize:
      100 * 1024 * 1024,
  },
});

/* =========================================================
   PROCESS FILE
========================================================= */

const processFile = async (
  file,
  uploadPath
) => {

  const mime =
    file.mimetype || "";

  /* =======================================================
     IMAGE

     JPG / PNG → WEBP

     Existing behavior preserved.
  ======================================================= */

  if (isImage(mime)) {

    const filename =
      `${file.fieldname}_${Date.now()}_${Math.round(
        Math.random() * 100000
      )}.webp`;

    const outputPath =
      path.join(
        uploadPath,
        filename
      );

    await sharp(file.buffer)
      .resize(
        1200,
        1200,
        {
          fit: "inside",
        }
      )
      .webp({
        quality: 80,
      })
      .toFile(
        outputPath
      );

    return (
      "/" +
      outputPath.replace(
        /\\/g,
        "/"
      )
    );
  }

  /* =======================================================
     DOCUMENT

     PDF
     DOC
     DOCX
     ZIP

     Documents are NOT converted to WebP.
  ======================================================= */

  const ext =
    path
      .extname(
        file.originalname
      )
      .toLowerCase();

  const safeExtension =
    ext || ".bin";

  const filename =
    `${file.fieldname}_${Date.now()}_${Math.round(
      Math.random() * 100000
    )}${safeExtension}`;

  const outputPath =
    path.join(
      uploadPath,
      filename
    );

  fs.writeFileSync(
    outputPath,
    file.buffer
  );

  return (
    "/" +
    outputPath.replace(
      /\\/g,
      "/"
    )
  );
};

/* =========================================================
   FILE PROCESSOR
========================================================= */

const convertToWebp = async (
  req,
  res,
  next
) => {

  try {

    /* =====================================================
       NO FILE
    ===================================================== */

    if (
      !req.file &&
      !req.files
    ) {
      return next();
    }

    /* =====================================================
       UPLOAD DIRECTORY
    ===================================================== */

    const uploadPath =
      getUploadPath(req);

    /* =====================================================
       SINGLE FILE
    ===================================================== */

    if (req.file) {

      const pathSaved =
        await processFile(
          req.file,
          uploadPath
        );

      /*
       * Save path to multer object.
       */

      req.file.path =
        pathSaved;

      /*
       * Save path to request body.
       */

      req.body[
        req.file.fieldname
      ] = pathSaved;

      console.log(
        "FILE SAVED:",
        pathSaved
      );
    }

    /* =====================================================
       MULTIPLE FILES

       upload.fields()
    ===================================================== */

    if (req.files) {

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

        /* ================================================
           SINGLE FILE
        ================================================ */

        if (
          uploadedFiles.length === 1
        ) {

          req.body[field] =
            uploadedFiles[0];

        } else {

          /* ==============================================
             MULTIPLE FILES
          ============================================== */

          req.body[field] =
            uploadedFiles;
        }
      }
    }

    next();

  } catch (err) {

    console.error(
      "UPLOAD ERROR:",
      err
    );

    return res.status(500).json({
      success: false,

      message:
        err.message ||
        "File upload failed.",
    });
  }
};

/* =========================================================
   DELETE FILE
========================================================= */

const deleteImageFile = (
  imagePath
) => {

  try {

    if (!imagePath) {
      return;
    }

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

    const cleanPath =
      imagePath.replace(
        /^\/+/,
        ""
      );

    const fullPath =
      path.join(
        __dirname,
        "..",
        cleanPath
      );

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
    }

  } catch (err) {

    console.error(
      "DELETE ERROR:",
      err
    );
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
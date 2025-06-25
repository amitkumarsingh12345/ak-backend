const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadSite } = require("../controllers/siteController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverImages") cb(null, "uploads/cover/");
    else if (file.fieldname === "innerImages") cb(null, "uploads/inner/");
    else if (file.fieldname === "uploads") cb(null, "uploads/pdf/");
    else cb(null, "uploads/others/");
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const cpUpload = upload.fields([
  { name: "coverImages", maxCount: 5 },
  { name: "innerImages", maxCount: 10 },
  { name: "uploads", maxCount: 8 },
]);

router.post("/upload", authenticateToken, cpUpload, uploadSite);

module.exports = router;

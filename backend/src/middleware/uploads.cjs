const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imagesDir = path.join(__dirname, "..", "images");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".png";
    const fileName = `photo-${Date.now()}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

module.exports = upload;
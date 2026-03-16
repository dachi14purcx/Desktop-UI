const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads.cjs");

const { getPhotos, createPhoto, removePhoto } = require("../controllers/photosControllers.cjs");

router.get("/", getPhotos);
router.post("/", upload.single("image"), createPhoto);
router.delete("/:id", removePhoto);

module.exports = router;
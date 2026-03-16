const express = require("express");
const router = express.Router();

const { getWallpapers, createWallpaper, updateCurrentWallpaper, removeWallpaper } = require("../controllers/wallpapersControllers.cjs");

router.get("/", getWallpapers);
router.post("/", createWallpaper);
router.put("/current", updateCurrentWallpaper);
router.delete("/:id", removeWallpaper);

module.exports = router;
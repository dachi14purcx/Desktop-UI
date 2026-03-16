const { getAll, addWallpaper, setCurrentWallpaper, deleteWallpaper } = require('../services/wallpapersService.cjs')

function getWallpapers(req, res, next){
  try {
    const data = getAll()
    res.json({ data, success: true });
  } catch (err) {
    next(err)
  }
}

function createWallpaper(req, res, next) {
  try {
    const created = addWallpaper(req.body);
    res.status(201).json({ data: created, success: true });
  } catch (err) {
    next(err);
  }
}

function updateCurrentWallpaper(req, res, next) {
  try {
    const { wallpaperId } = req.body;
    const result = setCurrentWallpaper(wallpaperId);
    res.json({ data: result, success: true });
  } catch (err) {
    next(err);
  }
}

function removeWallpaper(req, res, next) {
  try {
    const result = deleteWallpaper(req.params.id);
    res.json({ data: result, success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWallpapers, createWallpaper, updateCurrentWallpaper, removeWallpaper }
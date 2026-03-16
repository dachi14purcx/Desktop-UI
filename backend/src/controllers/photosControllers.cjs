const { getAll, addPhoto, deletePhoto } = require("../services/photosService.cjs")

function getPhotos(req, res, next){
  try {
    const data = getAll()
    res.json({ data, success: true });
  } catch (err) {
    next(err)
  }
}

function createPhoto(req, res, next) {
  try {
    const created = addPhoto(req.file)
    res.status(201).json({ data: created, success: true })
  } catch (err) {
    next(err)
  }
}

function removePhoto(req, res, next) {
  try {
    const result = deletePhoto(req.params.id);
    res.json({ data: result, success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { getPhotos, createPhoto, removePhoto }

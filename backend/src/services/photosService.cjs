const db = require("../database/db.cjs")
const fs = require("fs");
const path = require("path");

// takes all photos path from db, must take files too
function getAll() {
  const photos = db.prepare(`
    SELECT * FROM photos ORDER BY date    
  `).all()

  return photos
}

// adds files to images folder and db
function addPhoto(file) {
  if (!file) {
      const err = new Error("image file is required");
      err.statusCode = 400;
      throw err;
  }

  try {
    const fileName = file.filename;
    const relativePath = `images/${fileName}`;

    const info = db.prepare(`
        INSERT INTO photos (name, path) VALUES (?, ?)
    `).run(fileName, relativePath);

    return db.prepare(`
        SELECT * FROM photos WHERE id = ?
    `).get(info.lastInsertRowid);

    } catch (e) {
      const err = new Error("Failed to save photo");
      err.statusCode = 500;
      throw err;
    }
}

const imagesDir = path.join(__dirname, "..", "images");

// deletes photo by id 
function deletePhoto(photoId) {
  const id = Number(photoId);

  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("photoId must be positive integer");
    err.statusCode = 400;
    throw err;
  }

  const photo = db.prepare(`SELECT * FROM photos WHERE id = ?`).get(id);
  if (!photo) {
    const err = new Error("Photo not found");
    err.statusCode = 404;
    throw err;
  }

  const filePath = photo.url
    ? path.join(imagesDir, path.basename(photo.url))
    : null;

  db.prepare(`DELETE FROM photos WHERE id = ?`).run(id);

  if (filePath) {
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (e) {
      console.error("Failed to delete file:", filePath, e);
    }
  }

  return { deletedId: id };
}

module.exports = { getAll, addPhoto, deletePhoto }
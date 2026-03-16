const db = require('../database/db.cjs')

// takes all photos path from db, must take files too
function getAll() {
    const files = db.prepare(`
        SELECT * FROM files ORDER BY name, id
    `).all()

    return files
}


// adds files to images folder and db
function addFile({name, type, data}) {
    if (!name || /^[^\p{L}]/u.test(name[0]) || /^[^\p{L}]/u.test(type)){
        const err = new Error('Invalid name or type')
        err.statusCode = 400
        throw err
    }

    const safeName = (name && String(name).trim()) || "Untitled"

    try {
        const info = db.prepare(`
            INSERT INTO files (name, type, data) VALUES (?, ?, ?)
        `).run(safeName, type.trim(), data)

        return db.prepare(`
            SELECT * FROM files WHERE id = ?
        `).get(info.lastInsertRowid)
    } catch(e) {
        const err = new Error('File with this name already exists')
        err.statusCode = 400
        throw err
    }
}

function updateData({data, fileId}){
    const id = Number(fileId)
    if (!Number.isInteger(id) || id <= 0){
        const err = new Error("fileID must be positive integer")
        err.statusCode = 400
        throw err
    }

    const exists = db.prepare(`SELECT * FROM files WHERE id = ?`).get(id)
    if(!exists){
        const err = new Error("File not found")
        err.statusCode = 404
        throw err
    }

    db.prepare(`
        UPDATE files SET data = ? WHERE id = ?
    `).run(data, id)

    return { changedFile: id }
}

function deleteFile(fileId){
    const id = Number(fileId)
    if (!Number.isInteger(id) || id <= 0){
        const err = new Error("fileID must be positive integer")
        err.statusCode = 400
        throw err
    }

    const exists = db.prepare(`SELECT * FROM files WHERE id = ?`).get(id)
    if(!exists){
        const err = new Error("File not found")
        err.statusCode = 404
        throw err
    }

    db.prepare(`
        DELETE FROM files WHERE id = ?    
    `).run(id)

    return { deletedFile: id }
}

module.exports = { getAll, addFile, updateData, deleteFile }
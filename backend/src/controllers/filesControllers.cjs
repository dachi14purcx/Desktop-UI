const { getAll, addFile, updateData, deleteFile } = require('../services/filesService.cjs')

function getFiles(req, res, next){
    try {
        const data = getAll()
        res.json({ data, success: true })
    } catch (err) {
        next(err)
    }
}

function createFile(req, res, next) {
    try {
        const created = addFile(req.body)
        res.status(201).json({ data: created, success: true })
    } catch (err) {
        next(err)
    }
}

function updateFile(req, res, next) {
    try {
        const result = updateData(req.body)
        res.json({ data: result, success: true })
    } catch (err) {
        next(err)
    }
}

function removeFile(req, res, next) {
    try {
        const result = deleteFile(req.params.id)

        res.json({ data: result, success: true })
    } catch (err) {
        next(err)
    }
}

module.exports = { getFiles, createFile, updateFile, removeFile }
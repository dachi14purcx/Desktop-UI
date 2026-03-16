const express = require ("express")
const router = express.Router()

const { getFiles, createFile, updateFile, removeFile } = require('../controllers/filesControllers.cjs')

router.get("/", getFiles)
router.post("/", createFile)
router.put("/data", updateFile)
router.delete("/:id", removeFile)

module.exports = router
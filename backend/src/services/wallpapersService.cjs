const db = require('../database/db.cjs')

function getAll() {
    const wallpapers = db.prepare(`
      SELECT * FROM wallpapers ORDER BY  is_current DESC, id
    `).all()

    return wallpapers
}

function addWallpaper({name, url}){
    if (!url || typeof url !== "string") {
        const err = new Error("url is required");
        err.statusCode = 400;
        throw err;
    }

    const safeName = (name && String(name).trim()) || "Untitled"

    try {
        const info = db.prepare(`
            INSERT INTO wallpapers (name, url) VALUES (?, ?)    
        `).run(safeName, url.trim())

        return db.prepare(`
            SELECT * FROM wallpapers WHERE id = ?    
        `).get(info.lastInsertRowid)
    } 
    
    catch(e) {
        const err = new Error('This wallpaper URL already exists')
        err.statusCode = 400
        throw err
    }
}


function setCurrentWallpaper(wallpaperId){
    const id  = Number(wallpaperId)
    if(!Number.isInteger(id) || id <= 0){
        const err = new Error("wallpaperId must be positive integer")
        err.statusCode = 400
        throw err
    }

    const exists = db.prepare(`SELECT * FROM wallpapers WHERE id = ?`).get(id)
    if(!exists){
        const err = new Error("Wallpaper not found")
        err.statusCode = 404
        throw err
    }

    db.prepare(`
        UPDATE wallpapers SET is_current = 0 WHERE is_current = 1
    `).run()

    db.prepare(`
      UPDATE wallpapers SET is_current = 1 WHERE id = ?
    `).run(id)

    return { currentWallpaperId: id }
}


function deleteWallpaper(wallpaperId){
    const id = Number(wallpaperId);
    if (!Number.isInteger(id) || id <= 0) {
        const err = new Error("wallpaperId must be positive integer");
        err.statusCode = 400;
        throw err;
    }

    const wp = db.prepare(`SELECT * FROM wallpapers WHERE id = ?`).get(id)
    if(!wp){
        const err = new Error('Wallpaper not found')
        err.statusCode = 400
        throw err
    }
    if(wp.is_default){
        const err = new Error('Default wallpapers can not be deleted')
        err.statusCode = 400
        throw err
    }


    const wasCurrent = wp.is_current == 1

    db.prepare(`
        DELETE FROM wallpapers WHERE id = ?    
    `).run(id)
    
    if(wasCurrent){
        setCurrentWallpaper(1)
    }

    return { deletedId: id, currentChanged: wasCurrent}
}


module.exports = { getAll, addWallpaper, setCurrentWallpaper, deleteWallpaper }
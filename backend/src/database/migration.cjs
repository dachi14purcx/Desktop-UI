const db = require('./db.cjs')

const DEFAULT_WALLPAPERS = [
  { name: 'landScape', url: 'https://1746leblogphoto-1278.kxcdn.com/wp-content/uploads/2022/04/35866957925_4d2979d859_o.jpg'},
  { name: 'windows10', url: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/22661965/img19.jpg?quality=90&strip=all'},
  { name: 'windows7', url: 'https://4kwallpapers.com/images/wallpapers/windows-7-official-3840x2160-13944.jpg' },
  { name: 'cave', url: 'https://i.sstatic.net/lubGc.jpg' },
  { name: 'landScapePug', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7g8mNpciyOjuYspm14CMSbZWoqfr9G6suyQ&s' }
]

function runMigration() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS wallpapers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      is_current INTEGER NOT NULL DEFAULT 0
    );
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT "txt",
      data TEXT
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      path TEXT NOT NULL,
      date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  const count = db.prepare(`SELECT COUNT(*) as c FROM wallpapers`).get().c;
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO wallpapers (name, url, is_default)
      VALUES (@name, @url, 1)
    `);

    const tx = db.transaction(() => {
      for (const w of DEFAULT_WALLPAPERS) insert.run(w);
    });
    tx();

    db.prepare(`UPDATE wallpapers SET is_current = 1  WHERE id = 1`).run()
  }
}

module.exports = { runMigration }
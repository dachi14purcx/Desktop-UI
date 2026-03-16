const Database = require('better-sqlite3');
const path = require('path')

const DB_PATH = path.join(process.cwd(), "database.sqlite");

const db = new Database(DB_PATH);

module.exports = db;
const express = require("express");
const cors = require("cors");

const { notFound, errorHandler } = require("./src/middleware/errorHandler.cjs");
const wallpaperRoutes = require("./src/routes/wallpapersRoutes.cjs");
const { runMigration } = require("./src/database/migration.cjs");
const filesRoutes = require('./src/routes/filesRoutes.cjs')
const photosRoutes = require(`./src/routes/photosRoutes.cjs`)

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));


app.use("/wallpapers", wallpaperRoutes);
app.use("/files", filesRoutes)
app.use("/photos", photosRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = 5000;

function start() {
  runMigration();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start();
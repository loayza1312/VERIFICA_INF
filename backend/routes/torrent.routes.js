const express = require("express");
const router = express.Router();
const torrentController = require("../controllers/torrent.controller");

// ROTTE TORRENTS
router.get("/", torrentController.getTorrents);
router.get("/:id", torrentController.getTorrentById);
router.post("/", torrentController.createTorrent);

module.exports = router;

const Torrent = require("../models/torrent.model");

// CREA UN NUOVO TORRENT
exports.createTorrent = async (req, res) => {
  try {
    const torrent = await Torrent.create(req.body);
    res.status(201).json(torrent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// OTTIENI TUTTI I TORRENT
exports.getTorrents = async (req, res) => {
  try {
    const torrents = await Torrent.find();
    res.json(torrents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OTTIENI UN TORRENT SPECIFICO
exports.getTorrentById = async (req, res) => {
  try {
    const torrent = await Torrent.findById(req.params.id);
    if (!torrent) return res.status(404).json({ error: "Torrent non trovato" });
    res.json(torrent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

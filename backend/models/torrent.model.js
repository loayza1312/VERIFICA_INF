const mongoose = require("mongoose");

const TorrentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, maxlength: 160 },
    size: { type: Number, required: true },
    categories: { type: [String], required: true },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Torrent", TorrentSchema);

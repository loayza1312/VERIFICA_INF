const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    torrentId: { type: mongoose.Schema.Types.ObjectId, ref: "Torrent", required: true },
    user: { type: String, required: true },
    text: { type: String, maxlength: 160 },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);

const Comment = require("../models/comment.model");

// CREA UN COMMENTO
exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// OTTIENI TUTTI I COMMENTI DI UN TORRENT
exports.getCommentsByTorrent = async (req, res) => {
  try {
    const comments = await Comment.find({ torrentId: req.params.torrentId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

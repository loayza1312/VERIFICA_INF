const express = require("express");
const router = express.Router();

const { 
  createComment, 
  getCommentsByTorrent 
} = require("../controllers/comment.controller");

// CREATE COMMENT
router.post("/", createComment);

// GET COMMENTS FOR ONE TORRENT
router.get("/:torrentId", getCommentsByTorrent);

module.exports = router;

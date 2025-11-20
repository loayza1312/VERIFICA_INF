require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inizializzo express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import delle routes
const torrentRoutes = require("./routes/torrent.routes");
const commentRoutes = require("./routes/comment.routes");

// Connessione a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connesso a MongoDB Atlas"))
  .catch(err => console.error("❌ Errore connessione MongoDB:", err));

// Rotta di test
app.get("/", (req, res) => {
  res.json({ message: "Backend attivo e funzionante!" });
});

// Collego le routes vere
app.use("/api/torrents", torrentRoutes);
app.use("/api/comments", commentRoutes);

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});

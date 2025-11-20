const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");

// --- HOME: carica tutti i torrent ---
async function loadTorrents() {
  const res = await fetch(`${API}/torrents`);
  const data = await res.json();

  const box = document.getElementById("torrentList");
  if (!box) return;

  box.innerHTML = data.map(t => `
    <div>
      <h3><a href="torrent.html?id=${t._id}">${t.title}</a></h3>
      <p>${t.description}</p>
      <p><b>${t.sizeMB} MB</b></p>
    </div>
  `).join("");
}

loadTorrents();

// --- RICERCA ---
async function searchTorrent() {
  const q = document.getElementById("searchInput").value;
  const res = await fetch(`${API}/torrents/search?q=${q}`);
  const data = await res.json();

  const box = document.getElementById("torrentList");
  box.innerHTML = data.map(t => `
    <div>
      <h3><a href="torrent.html?id=${t._id}">${t.title}</a></h3>
      <p>${t.description}</p>
    </div>
  `).join("");
}

// --- PAGINA DETTAGLIO ---
async function loadTorrentDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  const res = await fetch(`${API}/torrents/${id}`);
  const t = await res.json();

  document.getElementById("title").innerText = t.title;
  document.getElementById("description").innerText = t.description;
  document.getElementById("size").innerText = t.sizeMB + " MB";
  document.getElementById("categories").innerText = t.categories.join(", ");

  loadComments(id);
}

loadTorrentDetail();

// --- COMMENTI ---
async function loadComments(id) {
  const res = await fetch(`${API}/comments?torrentId=${id}`);
  const data = await res.json();

  const box = document.getElementById("commentList");
  box.innerHTML = data.map(c => `
    <p><b>${c.rating}⭐ - ${c.author}</b><br>${c.text}</p>
  `).join("");
}

async function addComment() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const body = {
    torrentId: id,
    text: document.getElementById("commentText").value,
    rating: document.getElementById("rating").value,
    author: "utente"
  };

  await fetch(`${API}/comments`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });

  location.reload();
}

// --- LOGIN ---
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  alert("Login effettuato!");
  location.href = "index.html";
}

// --- UPLOAD TORRENT ---
async function uploadTorrent() {
  const body = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    sizeMB: Number(document.getElementById("size").value),
    categories: document.getElementById("categories").value.split(","),
    images: document.getElementById("images").value.split(","),
    author: "utente"
  };

  await fetch(`${API}/torrents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(body)
  });

  alert("Torrent caricato!");
  location.href = "index.html";
}

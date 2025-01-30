const express = require("express");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
  databaseURL: "https://your-database-url.firebaseio.com",
});

const db = admin.database();
const app = express();
app.use(express.json());

// Endpoint untuk memperbarui lokasi pengguna
app.post("/update-location", (req, res) => {
  const { userId, lat, lng } = req.body;
  db.ref(`locations/${userId}`).set({ lat, lng })
    .then(() => res.send("Location updated"))
    .catch((err) => res.status(500).send(err.message));
});

// Endpoint untuk mendapatkan lokasi pengguna lain
app.get("/get-location/:userId", async (req, res) => {
  const snapshot = await db.ref(`locations/${req.params.userId}`).once("value");
  res.json(snapshot.val());
});

app.listen(3000, () => console.log("Server running on port 3000"));

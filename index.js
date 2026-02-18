const express = require("express");
const { nanoid } = require("nanoid");

const app = express();
const PORT = 3000;

app.use(express.json());

const urlDatabase = {};
// Create short URL
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok"
  })
})
app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = nanoid(6);
  urlDatabase[shortId] = longUrl;

  res.json({
    shortUrl: `http://localhost:${PORT}/${shortId}`,
  });
});

// Redirect to original URL
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;

  const longUrl = urlDatabase[shortId];

  if (!longUrl) {
    return res.status(404).send("URL not found");
  }

  res.redirect(longUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
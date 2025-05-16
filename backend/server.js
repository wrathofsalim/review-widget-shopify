const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const reviewsFile = path.join(__dirname, "reviews.json");
let reviews = [];

if (fs.existsSync(reviewsFile)) {
  try {
    const rawData = fs.readFileSync(reviewsFile, "utf8").trim();
    reviews = rawData ? JSON.parse(rawData) : [];
    if (!Array.isArray(reviews)) reviews = [];
  } catch (error) {
    console.error("Error reading reviews.json:", error);
    reviews = [];
  }
} else {
  fs.writeFileSync(reviewsFile, JSON.stringify([]));
}

app.get("/api/reviews", (req, res) => {
  const productId = req.query.product;
  if (!productId) return res.status(400).json({ error: "Missing product ID" });
  const filteredReviews = reviews.filter(r => r.productId == productId);
  res.json(filteredReviews);
});

app.post("/api/reviews", (req, res) => {
  const { productId, user, comment, stars, likes, dislikes, image } = req.body;
  if (!productId || !user || !comment || !stars) {
    return res.status(400).json({ error: "Missing review data" });
  }

  const newReview = {
    id: Date.now().toString(), // Add an ID if needed
    productId,
    user,
    comment,
    stars,
    likes: likes || 0,
    dislikes: dislikes || 0,
    image: image || null,
    dateDate: new Date().toISOString()
  };

  reviews.push(newReview);
  fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));

  res.json({ message: "Review added successfully", review: newReview });
});

app.listen(port, () => {
  console.log(`API backend running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for Shopify and external requests
app.use(cors());
app.use(express.json());

// Load reviews from a local JSON file & Create If Missing
const reviewsFile = "reviews.json";
let reviews = [];

if (fs.existsSync(reviewsFile)) {
  reviews = JSON.parse(fs.readFileSync(reviewsFile, "utf8"));
} else {
  fs.writeFileSync(reviewsFile, JSON.stringify([]));
}

// API Endpoint to Fetch Reviews by Product ID
app.get("/api/reviews", (req, res) => {
  const productId = req.query.product;
  if (!productId) return res.status(400).json({ error: "Missing product ID" });

  const filteredReviews = reviews.filter(review => review.productId == productId);
  res.json(filteredReviews);
});

// API Endpoint to Add a New Review (Includes Stars, Likes & Images)
app.post("/api/reviews", (req, res) => {
  const { productId, user, comment, stars, likes, dislikes, image } = req.body;
  if (!productId || !user || !comment || !stars) {
    return res.status(400).json({ error: "Missing review data" });
  }

  const newReview = {
    productId,
    user,
    comment,
    stars,
    likes: likes || 0,
    dislikes: dislikes || 0,
    image: image || null
  };

  reviews.push(newReview);
  fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));

  res.json({ message: "Review added successfully", review: newReview });
});

// Start the Server
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
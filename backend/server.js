const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS so that your React frontend (running on a different port in development) can connect to this API.
app.use(cors());
app.use(express.json());

// Load reviews from a local JSON file & create if missing
const reviewsFile = path.join(__dirname, "reviews.json"); // Changed from "backend/reviews.json" to "reviews.json"
let reviews = [];

if (fs.existsSync(reviewsFile)) {
  try {
    const rawData = fs.readFileSync(reviewsFile, "utf8").trim();

    if (!rawData || rawData === "[]" || rawData.length === 0) {
      reviews = [];
      fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
    } else {
      reviews = JSON.parse(rawData);
      if (!Array.isArray(reviews)) {
        reviews = [];
        fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
      }
    }
  } catch (error) {
    console.error("Error reading reviews.json:", error);
    reviews = [];
  }
} else {
  fs.writeFileSync(reviewsFile, JSON.stringify([]));
}

// GET endpoint to fetch reviews for a given product by productId
app.get("/api/reviews", (req, res) => {
  const productId = req.query.product;
  if (!productId)
    return res.status(400).json({ error: "Missing product ID" });

  // Filter reviews by product ID using loose comparison (==)
  const filteredReviews = reviews.filter(review => review.productId == productId);
  res.json(filteredReviews);
});

// POST endpoint to add a new review
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
    image: image || null,
  };

  reviews.push(newReview);
  fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));

  res.json({ message: "Review added successfully", review: newReview });
});

// ----- Serve React Build in Production -----
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app's build directory
  app.use(express.static(path.join(__dirname, "build")));

  // The “catchall” handler: for any request that doesn’t match the API routes,
  // send back React's index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Backend (API) running on port ${port}`);
});
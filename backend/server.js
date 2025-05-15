const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for Shopify and external requests
app.use(cors());
app.use(express.json());

// Load reviews from a local JSON file & Create If Missing
const reviewsFile = "backend/reviews.json"; // Correct file path
let reviews = [];

if (fs.existsSync(reviewsFile)) {
  try {
    const rawData = fs.readFileSync(reviewsFile, "utf8").trim();
    
    // Debug log to verify the file content
    console.log("Raw JSON Data from File:", rawData); 

    if (!rawData || rawData === "[]" || rawData.length === 0) {
      console.error("reviews.json is EMPTY! Initializing it...");
      reviews = [];
      fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
    } else {
      reviews = JSON.parse(rawData);
      
      // Debug log to verify the parsed reviews
      console.log("Parsed Reviews:", reviews);
      
      if (!Array.isArray(reviews)) {
        console.error("reviews.json is not an array! Resetting file...");
        reviews = [];
        fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
      }
    }
  } catch (error) {
    console.error("Error reading reviews.json:", error);
    reviews = [];
  }
} else {
  console.log("reviews.json not found, creating new file...");
  fs.writeFileSync(reviewsFile, JSON.stringify([]));
}

// API Endpoint to Fetch Reviews by Product ID
app.get("/api/reviews", (req, res) => {
  const productId = req.query.product;
  if (!productId) return res.status(400).json({ error: "Missing product ID" });

  console.log("Requested Product ID:", productId);
  console.log("All Reviews Loaded:", reviews);

  // Check if reviews exist at all
  if (reviews.length === 0) {
    console.error("No reviews found in the backend!");
    return res.status(500).json({ error: "No reviews available." });
  }

  // Debugging: Log each review's product ID
  reviews.forEach(review => console.log(`Review Product ID: ${review.productId}`));

  // Filter reviews by product ID (using loose comparison to prevent type mismatch)
  const filteredReviews = reviews.filter(review => review.productId == productId);

  console.log("Filtered Reviews:", filteredReviews);
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
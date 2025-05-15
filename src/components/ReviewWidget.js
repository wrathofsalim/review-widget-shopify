import React, { useState, useEffect } from "react";

const ReviewWidget = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!productId) return;

    fetch(`http://localhost:5000/api/reviews?product=${productId}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error("Error fetching reviews:", error));
  }, [productId]);

  return (
    <div id="reviews-section">
      <h2>Customer Reviews</h2>
      <div id="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <h3>{review.user}</h3>
              <p>{review.comment}</p>
              <div className="review-stars">
                {"★".repeat(review.stars)}
                {"☆".repeat(5 - review.stars)}
              </div>
              <div className="review-likes">
                👍 {review.likes} | 👎 {review.dislikes}
              </div>
              {review.image && <img src={review.image} alt="User review" className="review-image" />}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewWidget;
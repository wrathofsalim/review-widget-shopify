import React, { useState, useEffect } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import Pagination from "./Pagination";
import ReviewModal from "./ReviewModal";

const ReviewWidget = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  useEffect(() => {
    if (!productId) return;
    fetch(`http://localhost:5000/api/reviews?product=${productId}`)
      .then((response) => response.json())
      .then((data) => {
        // Add unique ID to each review
        const reviewsWithId = data.map((review, index) => ({
          ...review,
          id: `${review.productId}_${review.user}_${index}`
        }));

        setReviews(reviewsWithId);
        calculateRatings(reviewsWithId);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [productId]);

  const calculateRatings = (reviews) => {
    const totalReviews = reviews.length;
    const ratingSum = reviews.reduce((sum, review) => sum + review.stars, 0);
    const average = totalReviews ? (ratingSum / totalReviews).toFixed(1) : 0;

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const stars = review.stars;
      if (counts[stars] !== undefined) {
        counts[stars] += 1;
      }
    });

    setAverageRating(average);
    setRatingCounts(counts);
  };

  const handleReviewSubmitted = (newReview) => {
    // Assign unique ID to new review
    const newId = `${newReview.productId}_${newReview.user}_${reviews.length}`;
    const newReviewWithId = { ...newReview, id: newId };

    const updatedReviews = [...reviews, newReviewWithId];
    setReviews(updatedReviews);
    calculateRatings(updatedReviews);
    setShowReviewModal(false);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div id="reviews-section">
      <h2>Customer Reviews</h2>

      <div id="review-summary">
        <div className="average-rating">
          <div className="review-stars">
            {"★".repeat(Math.round(averageRating))}
            <div className="review-stars-empty">
              {"★".repeat(5 - Math.round(averageRating))}
            </div>
            <p>{averageRating}</p>
          </div>
          <p>Based on {reviews.length} review{reviews.length !== 1 && "s"}</p>
        </div>

        <div className="rating-breakdown">
          {Object.entries(ratingCounts)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([star, count]) => (
              <div key={star} className="rating-line">
                <div className="rating-line-stars">
                  {"★".repeat(Number(star))}
                  <span className="review-stars-empty">
                    {"★".repeat(5 - Number(star))}
                  </span>
                </div>
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{
                      width: reviews.length
                        ? ((count / reviews.length) * 100).toFixed(0) + "%"
                        : "0%"
                    }}
                  ></div>
                </div>
                <div className="rating-count">{count}</div>
              </div>
            ))}
        </div>

        <button className="leave-a-review-btn" onClick={() => setShowReviewModal(true)}>
          Leave a review
        </button>
      </div>

      <ReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)}>
        <ReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />
      </ReviewModal>

      <ReviewList
        reviews={currentReviews}
        currentPage={currentPage}
        reviewsPerPage={reviewsPerPage}
        onPageChange={setCurrentPage}
        totalReviews={reviews.length}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(reviews.length / reviewsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ReviewWidget;

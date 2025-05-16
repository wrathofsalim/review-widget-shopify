import React, { useState } from "react";

const ReviewForm = ({ productId, onReviewSubmitted, onClose }) => {
  const [review, setReview] = useState({
    productId,
    user: "",
    email: "",
    title: "",
    comment: "",
    stars: 0,
    likes: 0,
    dislikes: 0,
    image: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Review submitted!");
        onReviewSubmitted(data.review);
        setReview({ user: "", email: "", title: "", comment: "", stars: 0, image: "" });
        onClose();
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  return (
    <div className="review-modal">
      <button className="modal-close-btn" onClick={onClose}>×</button>

      <h2 className="modal-title">Leave a Review</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <label>Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={review.user}
          onChange={(e) => setReview({ ...review, user: e.target.value })}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your e-mail"
          value={review.email}
          onChange={(e) => setReview({ ...review, email: e.target.value })}
          required
        />

        <label>Rating</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`star ${num <= review.stars ? "filled" : ""}`}
              onClick={() => setReview({ ...review, stars: num })}
            >★</span>
          ))}
        </div>

        <label>Review Title</label>
        <input
          type="text"
          placeholder="Enter review title"
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
          required
        />

        <label>Review</label>
        <textarea
          placeholder="Write your review"
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          required
        />

        <label>Upload a photo of how it looks (optional)</label>
        <div class="file-upload-wrapper">
          <label for="file-upload" class="file-upload-label">
            <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.98629 24.1918C2.33835 24.1918 1.78367 23.9611 1.32225 23.4997C0.860835 23.0382 0.630127 22.4836 0.630127 21.8356V7.69864C0.630127 7.05069 0.860835 6.49601 1.32225 6.03459C1.78367 5.57318 2.33835 5.34247 2.98629 5.34247H6.69725L8.8767 2.98631H15.9452V5.34247H9.90752L7.75752 7.69864H2.98629V21.8356H21.8356V11.2329H24.1918V21.8356C24.1918 22.4836 23.9611 23.0382 23.4996 23.4997C23.0382 23.9611 22.4836 24.1918 21.8356 24.1918H2.98629ZM21.8356 7.69864V5.34247H19.4794V2.98631H21.8356V0.630142H24.1918V2.98631H26.5479V5.34247H24.1918V7.69864H21.8356ZM12.4109 20.0685C13.8836 20.0685 15.1353 19.5531 16.1661 18.5223C17.1969 17.4914 17.7123 16.2397 17.7123 14.7671C17.7123 13.2945 17.1969 12.0428 16.1661 11.012C15.1353 9.98117 13.8836 9.46576 12.4109 9.46576C10.9383 9.46576 9.68663 9.98117 8.65581 11.012C7.62499 12.0428 7.10958 13.2945 7.10958 14.7671C7.10958 16.2397 7.62499 17.4914 8.65581 18.5223C9.68663 19.5531 10.9383 20.0685 12.4109 20.0685ZM12.4109 17.7123C11.5863 17.7123 10.8893 17.4276 10.3199 16.8582C9.75045 16.2888 9.46574 15.5918 9.46574 14.7671C9.46574 13.9425 9.75045 13.2454 10.3199 12.676C10.8893 12.1066 11.5863 11.8219 12.4109 11.8219C13.2356 11.8219 13.9326 12.1066 14.502 12.676C15.0715 13.2454 15.3562 13.9425 15.3562 14.7671C15.3562 15.5918 15.0715 16.2888 14.502 16.8582C13.9326 17.4276 13.2356 17.7123 12.4109 17.7123Z" fill="#1C1B1F" fill-opacity="0.4" />
            </svg>
          </label>
          <input type="file" id="file-upload" class="file-upload-input" />
        </div>


        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
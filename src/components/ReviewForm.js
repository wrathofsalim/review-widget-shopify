import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ productId }) => {
  const [review, setReview] = useState({ name: "", email: "", rating: 5, title: "", content: "", photo: null });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`https://your-server.com/reviews/${productId}`, review)
      .then(response => alert("Review submitted!"))
      .catch(error => console.error("Error submitting review:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setReview({ ...review, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setReview({ ...review, email: e.target.value })} />
      <select onChange={(e) => setReview({ ...review, rating: e.target.value })}>
        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Stars</option>)}
      </select>
      <input type="text" placeholder="Title" onChange={(e) => setReview({ ...review, title: e.target.value })} />
      <textarea placeholder="Content" onChange={(e) => setReview({ ...review, content: e.target.value })} />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
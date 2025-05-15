import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("highest");

  useEffect(() => {
    axios.get(`https://your-server.com/reviews/${productId}?sort=${sortOption}`)
      .then(response => setReviews(response.data.reviews))
      .catch(error => console.error("Error fetching reviews:", error));
  }, [productId, sortOption]);

  return (
    <div>
      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
        <option value="pictures">Only Pictures</option>
        <option value="mostHelpful">Most Helpful</option>
      </select>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <strong>{review.title}</strong> - {review.rating} Stars
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
      <Pagination totalReviews={reviews.length} />
    </div>
  );
};

export default ReviewList;
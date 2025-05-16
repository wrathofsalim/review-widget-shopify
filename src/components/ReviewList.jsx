import React, { useState, useEffect } from "react";

const ReviewList = ({ reviews, currentPage, reviewsPerPage, onPageChange, totalReviews }) => {
  const [sortOption, setSortOption] = useState("highest");
  const [localReviews, setLocalReviews] = useState(reviews);

  // Track liked/disliked reviews by their IDs
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [dislikedReviews, setDislikedReviews] = useState(new Set());

  useEffect(() => {
    setLocalReviews(reviews);
    setLikedReviews(new Set());
    setDislikedReviews(new Set());
  }, [reviews]);

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const sortedReviews = [...localReviews].sort((a, b) => {
    if (sortOption === "highest") return b.stars - a.stars;
    if (sortOption === "lowest") return a.stars - b.stars;
    if (sortOption === "mostHelpful") return b.likes - a.likes;
    if (sortOption === "onlyPictures") return b.image ? 1 : -1;
    return 0;
  });

  const handleLike = (id) => {
    if (likedReviews.has(id)) {
      // If already liked, remove like
      setLikedReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setLocalReviews(prev =>
        prev.map(r =>
          r.id === id ? { ...r, likes: r.likes - 1 } : r
        )
      );
    } else {
      // Add like
      setLikedReviews(prev => new Set(prev).add(id));
      setLocalReviews(prev =>
        prev.map(r =>
          r.id === id ? { ...r, likes: r.likes + 1 } : r
        )
      );
      // If disliked before, remove dislike
      if (dislikedReviews.has(id)) {
        setDislikedReviews(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setLocalReviews(prev =>
          prev.map(r =>
            r.id === id ? { ...r, dislikes: r.dislikes - 1 } : r
          )
        );
      }
    }
  };

  const handleDislike = (id) => {
    if (dislikedReviews.has(id)) {
      // Remove dislike
      setDislikedReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setLocalReviews(prev =>
        prev.map(r =>
          r.id === id ? { ...r, dislikes: r.dislikes - 1 } : r
        )
      );
    } else {
      // Add dislike
      setDislikedReviews(prev => new Set(prev).add(id));
      setLocalReviews(prev =>
        prev.map(r =>
          r.id === id ? { ...r, dislikes: r.dislikes + 1 } : r
        )
      );
      // If liked before, remove like
      if (likedReviews.has(id)) {
        setLikedReviews(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        setLocalReviews(prev =>
          prev.map(r =>
            r.id === id ? { ...r, likes: r.likes - 1 } : r
          )
        );
      }
    }
  };

  // SVG icons
  const LikeIcon = ({ active }) => (
    active ? (
      // Active liked SVG (filled)
      <svg width="21" height="21" viewBox="0 0 21 21" fill="#007AFF" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 20.2849H5V7.28491L12 0.284912L13.25 1.53491C13.3667 1.65158 13.4625 1.80991 13.5375 2.00991C13.6125 2.20991 13.65 2.40158 13.65 2.58491V2.93491L12.55 7.28491H19C19.5333 7.28491 20 7.48491 20.4 7.88491C20.8 8.28491 21 8.75158 21 9.28491V11.2849C21 11.4016 20.9833 11.5266 20.95 11.6599C20.9167 11.7932 20.8833 11.9182 20.85 12.0349L17.85 19.0849C17.7 19.4182 17.45 19.7016 17.1 19.9349C16.75 20.1682 16.3833 20.2849 16 20.2849Z" />
      </svg>
    ) : (
      // Default like SVG
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 20.2849H5V7.28491L12 0.284912L13.25 1.53491C13.3667 1.65158 13.4625 1.80991 13.5375 2.00991C13.6125 2.20991 13.65 2.40158 13.65 2.58491V2.93491L12.55 7.28491H19C19.5333 7.28491 20 7.48491 20.4 7.88491C20.8 8.28491 21 8.75158 21 9.28491V11.2849C21 11.4016 20.9833 11.5266 20.95 11.6599C20.9167 11.7932 20.8833 11.9182 20.85 12.0349L17.85 19.0849C17.7 19.4182 17.45 19.7016 17.1 19.9349C16.75 20.1682 16.3833 20.2849 16 20.2849ZM7 18.2849H16L19 11.2849V9.28491H10L11.35 3.78491L7 8.13491V18.2849ZM5 7.28491V9.28491H2V18.2849H5V20.2849H0V7.28491H5Z" fill="#1C1B1F" />
      </svg>
    )
  );

  const DislikeIcon = ({ active }) => (
    active ? (
      // Active dislike SVG (filled)
      <svg width="21" height="21" viewBox="0 0 21 21" fill="#FF3B30" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0.284912H16V13.2849L9 20.2849L7.75 19.0349C7.63333 18.9182 7.5375 18.7599 7.4625 18.5599C7.3875 18.3599 7.35 18.1682 7.35 17.9849V17.6349L8.45 13.2849H2C1.46667 13.2849 1 13.0849 0.6 12.6849C0.2 12.2849 0 11.8182 0 11.2849V9.28491C0 9.16825 0.0166667 9.04325 0.05 8.90991C0.0833333 8.77658 0.116667 8.65158 0.15 8.53491L3.15 1.48491C3.3 1.15158 3.55 0.868245 3.9 0.634912C4.25 0.401579 4.61667 0.284912 5 0.284912Z" />
      </svg>
    ) : (
      // Default dislike SVG
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0.284912H16V13.2849L9 20.2849L7.75 19.0349C7.63333 18.9182 7.5375 18.7599 7.4625 18.5599C7.3875 18.3599 7.35 18.1682 7.35 17.9849V17.6349L8.45 13.2849H2C1.46667 13.2849 1 13.0849 0.6 12.6849C0.2 12.2849 0 11.8182 0 11.2849V9.28491C0 9.16825 0.0166667 9.04325 0.05 8.90991C0.0833333 8.77658 0.116667 8.65158 0.15 8.53491L3.15 1.48491C3.3 1.15158 3.55 0.868245 3.9 0.634912C4.25 0.401579 4.61667 0.284912 5 0.284912ZM14 2.28491H5L2 9.28491V11.2849H11L9.65 16.7849L14 12.4349V2.28491ZM16 13.2849V11.2849H19V2.28491H16V0.284912H21V13.2849H16Z" fill="#1C1B1F" />
      </svg>
    )
  );

  return (
    <div id="reviews-list">
      <div className="sort-container">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="mostHelpful">Most Helpful</option>
          <option value="onlyPictures">Only Pictures</option>
        </select>
      </div>

      {sortedReviews.length > 0 ? (
        sortedReviews.map((review) => {
          const liked = likedReviews.has(review.id);
          const disliked = dislikedReviews.has(review.id);

          return (
            <div key={review.id} className="review-item">
              <div className="review-item-body">
                <div className="review-item-body-upper">
                  <div className="review-stars">
                    {"★".repeat(review.stars)}
                    <div className="review-stars-empty">
                      {"★".repeat(5 - review.stars)}
                    </div>
                  </div>
                  <h3>{review.user}</h3>
                  <p>{review.dateDate}</p>
                </div>

                <div className="review-item-body-lower">
                  <h3>{review.title}</h3>
                  <p>{review.comment}</p>
                  {review.image && (
                    <img
                      src={window.shopifyAssetUrls[review.image]}
                      alt="Review"
                      className="review-image"
                    />
                  )}
                </div>
              </div>

              <div className="review-likes">
                <p>Was this helpful?</p>
                <p onClick={() => handleLike(review.id)} className="like-button" style={{cursor: 'pointer'}}>
                  <LikeIcon active={liked} /> {review.likes}
                </p>
                <p onClick={() => handleDislike(review.id)} className="dislike-button" style={{cursor: 'pointer'}}>
                  <DislikeIcon active={disliked} /> {review.dislikes}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No reviews yet. Be the first to leave one!</p>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-page-number ${page === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;

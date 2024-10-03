import React, { useState } from 'react';

const StarRating = ({ value = 0, onChange }) => {
  const [hover, setHover] = useState(0);

  const handleClick = (rating) => {
    console.log('Selected Rating:', rating);
    onChange(rating);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <span
            key={index}
            className="star"
            style={{
              color: ratingValue <= (hover || value) ? '#ffc107' : '#e4e5e9',
              fontSize: '2rem',
              cursor: 'pointer',
            }}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

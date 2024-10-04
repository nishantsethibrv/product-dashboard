import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviewData } from '../../store/actions/formAction';
import StarRating from './StarRating'
import "./review.css";

const ReviewForm = ({ reviewIndex }) => {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.formData.reviews[reviewIndex]);
  const [rating, setRating] = useState(0);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;

    dispatch(updateReviewData(reviewIndex, name, value));
  };
  const handleRatingChange = (value) => {
   setRating(value);
    dispatch(updateReviewData(reviewIndex, 'rating', value));
  };
  useEffect(() => {
    // console.log('review :', review);
  }, [review]);

  return (
    <div className="review-section">
      <label>Rating</label>
      <StarRating
        value={review?.rating || 0}
        onChange={handleRatingChange}
      />
      <label>Comment</label>
      <textarea 
        name="comment"
        className="mb-2 p-2"
        value={review.comment || ''} 
        onChange={handleReviewChange} 
        placeholder="Enter your comment"
      />

      <label>Reviewer Name</label>
      <input 
        type="text"
        className="mb-2 p-2"
        name="reviewerName" 
        value={review?.reviewerName || ''} 
        onChange={handleReviewChange} 
        placeholder="Enter reviewer's name"
      />

      <label>Reviewer Email</label>
      <input 
        type="email" 
        name="reviewerEmail"
        className="mb-2 p-2"
        value={review?.reviewerEmail || ''} 
        onChange={handleReviewChange} 
        placeholder="Enter reviewer's email"
      />
    </div>
  );
};

export default ReviewForm;

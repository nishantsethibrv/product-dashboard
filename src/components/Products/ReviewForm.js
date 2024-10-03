import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviewData } from '../../store/actions/formAction'; // Action to update reviews
import StarRating from './StarRating'

const ReviewForm = ({ reviewIndex }) => {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.formData.review[reviewIndex]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    
    // Log the name and value to debug
    // console.log(`Updating ${name}: ${value}`);
    
    // Dispatch the action to update the review in Redux
    dispatch(updateReviewData(reviewIndex, name, value));
  };
  const handleRatingChange = (value) => {
    dispatch(updateReviewData(reviewIndex, 'rating', value)); // Update the rating in Redux state
  };
  // Log the review state to verify it's being updated
  useEffect(() => {
    // console.log('Current review state:', review);
  }, [review]);

  return (
    <div>
      <label>Rating</label>
      {/* Uncomment and implement StarRating if needed */}
      <StarRating
        value={review?.rating || 0} // Get current rating from Redux state
        onChange={handleRatingChange} // Handle the rating change
      />
      <label>Comment</label>
      <textarea 
        name="comment" 
        value={review.comment || ''} 
        onChange={handleReviewChange} 
        placeholder="Enter your comment"
      />

      <label>Reviewer Name</label>
      <input 
        type="text" 
        name="reviewerName" 
        value={review?.reviewerName || ''} 
        onChange={handleReviewChange} 
        placeholder="Enter reviewer's name"
      />

      <label>Reviewer Email</label>
      <input 
        type="email" 
        name="reviewerEmail" 
        value={review?.reviewerEmail || ''} 
        onChange={handleReviewChange} 
        placeholder="Enter reviewer's email"
      />
    </div>
  );
};

export default ReviewForm;

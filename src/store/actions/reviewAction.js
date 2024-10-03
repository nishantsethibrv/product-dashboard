export const updateReviewData = (index, name, value) => {
    return {
      type: 'UPDATE_REVIEW_DATA',
      payload: { index, name, value },
    };
  };
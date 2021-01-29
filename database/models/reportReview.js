var _ = require('lodash');
const {
  Reviews,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
} = require('../index');

const reportReview = function(review_id) {
  return Reviews.findOneAndUpdate({id: review_id},
    {'reported': 'true'}
    )
    .exec()
    .then((result) => {
      console.log('this is my result in rR', result);
      return result;
    });
};

module.exports = reportReview;
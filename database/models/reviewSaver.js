var _ = require('lodash');
const {
  Reviews,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
} = require('../index');

const reviewSaver = function(reviewObj) {
  console.log('reviewObj in reviewSaver', reviewObj);

};


module.exports = reviewSaver;
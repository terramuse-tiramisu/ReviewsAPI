//write and export a function that reaches into the collections it needs to and sends it back
var _ = require('lodash');
const {
  Reviews,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
} = require('../index');

const reviewGetter = function(prodId, page = 1, count = 5, sort = 'helpful') {
  console.log('reviewGetter Called!, the prodID:', prodId);
  var packet = {
    product: parseInt(prodId),
    page: parseInt(page),
    count: parseInt(count),
    result: []
  };

  return Reviews.aggregate([
      {
        $match: {
          'product_id': packet.product
        }
      },
      {
        '$lookup': {
          'from': 'reviews_photos',
          'localField': 'id',
          'foreignField': 'review_id',
          'as': 'photos'
        }
      },
      {
        '$sample': {
          'size': 3
        }
      }
  ]).exec()
  .then((result) => {
    console.log('pipeline result:', result);
  })
  .catch((err) => {
    console.log('err in reviewGetter.js', err)
  })
};


module.exports = reviewGetter;
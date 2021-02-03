//write and export a function that reaches into the collections it needs to and sends it back
var _ = require('lodash');
const {
  Review,
  ReviewsPhoto,
  Characteristic,
  CharacteristicView
} = require('../index');

const reviewGetter = function(prodId, page = 1, count = 5, sort = 'helpfulness') {
  console.log('reviewGetter Called!, the prodID:', prodId);
  var packet = {
    product: parseInt(prodId),
    page: parseInt(page),
    count: parseInt(count),
    result: []
  };
  var sortMethod = sort;
  console.log('sortMethod', sortMethod);
  return Review.aggregate([
      {
        $match: {
          'product_id': packet.product
        }
      },
      {
        $lookup: {
          'from': 'reviews_photos',
          'localField': 'id',
          'foreignField': 'review_id',
          'as': 'photos'
        }
      },
      {
        $sort: {
          'helpfulness' : -1
        }
      },
      {
        $sample: {
          'size': packet.count
        }
      }
  ]).exec()
  .then((result) => {
    _.forEach(result, (review)=>{
      packet.result.push({
        'review_id': review.id,
        'rating': review.rating,
        'summary': review.summary,
        'recommend': review.recommend,
        'response': review.response,
        'body': review.body,
        'date': review.date,
        'reviewer_name': review.reviewer_name,
        'helpfulness': review.helpfulness,
        'photos': review.photos
      })
    })
    return result;

  })
};


module.exports = reviewGetter;
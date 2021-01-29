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
  }
  // console.log('packet', packet);
  // var skipVal = packet.page * packet.count;
  getReviewDocs(packet.product)
    .then((data) => {
      console.log('heres my data from getreviewDocs', data);
      _.forEach(data, (review)=>{
        packet.result.push({
          "review_id": review.id,
          "rating": review.rating,
          "summary": review.summary,
          "recommend": review.recommend,
          "response": review.response,
          "body": review.body,
          "date": review.date,
          "reviewer_name": review.reviewer_name,
          "helpfulness": review.helpfulness,
          "photos": []
        })
      })
      return packet;
    })
    .then((packet)=> {
      console.log('heres part of my packet', packet.result);
      //iterate over packet.result
      _.forEach(packet.result, (review) => {
        //for each review, pull out review Id
        //find all documents in the reviews_photos collection
        return ReviewsPhotos.find({review_id: review.review_id})
          .then((data) => {
            console.log('this is what came back from reviewsPhotos', data);
            // _.forEach(data, (obj))
            // packet.results.photos.push({id: obj.id, url: obj.url})
          })
      })
    //       //for each document that comes back, push {id: reviews_photos.id; url: reviews_phtos.url}
    //   //return packet
    // })
    .catch((err) => {
      console.log('err in reviewGetter.js', err)
    })
});

// const getReviewDocs = function(productId) {
//   console.log('proudct id', productId);
//   return Reviews.find({"product_id": productId}).exec()
// };

module.exports = reviewGetter;
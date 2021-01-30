var _ = require('lodash');
const {
  Review,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
} = require('../index');

const reviewSaver = function(reviewObj) {
  // console.log('reviewObj in reviewSaver', reviewObj);
  var today = new Date();
  Review.find().estimatedDocumentCount().exec()
    .then((count)=>{
      console.log('count', count);
      return Review.create({
        id: count + 1,
        product_id: reviewObj.product_id,
        rating: reviewObj.rating,
        date: today.toDateString(),
        summary:   reviewObj.summary,
        body: reviewObj.body,
        recommend: reviewObj.recommend,
        reported: 0,
        reviewer_name: reviewObj.name,
        reviewer_email: reviewObj.reviewer_email,
        response: '',
        helpfulness:  0
      })
    })
    .then((result)=>{
      console.log('this is what returns from insertOne', result);
    })


  //returns review_id
  //_.forEach(reviewsObj.photos((photo)=>{
    //Reviews_photos.save({review_id: reviewId, url: photo})
  // }))
    //query Characteristics to get the IDs (characteristics) associated with this product
    //write to Characteristic_views, storing the characteristic ID, the review_id (coming from the firt insertion) and the values coming from reviewObj.characteristics
  //
};


module.exports = reviewSaver;
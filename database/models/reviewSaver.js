var _ = require('lodash');
const {
  Review,
  ReviewsPhoto,
  Characteristic,
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
      _.forEach(reviewObj.photos, (photo) => {
        ReviewsPhoto.find().estimatedDocumentCount().exec()
        .then((photoID) => {
          return ReviewsPhoto.create({
            id: photoID,
            review_id: result.id,
            url: photo
          })
        })
        .then((photSub) => {
          console.log('photoSub', photSub.review_id);
        })
      })
    })
    .then(()=> {
      return Characteristic.find({product_id: 14}).select({id: 1, _id: 0})
    })
    .then((charIdArr) => {
      console.log('CharIdArr', charIdArr);
    })
  };



  //returns review_id
  //_.forEach(reviewsObj.photos((photo)=>{
    //Reviews_photos.save({review_id: reviewId, url: photo})
  // }))
    //query Characteristics to get the IDs (characteristics) associated with this product
    //write to Characteristic_views, storing the characteristic ID, the review_id (coming from the firt insertion) and the values coming from reviewObj.characteristics
  //


module.exports = reviewSaver;
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
  var realReviewId;
  return Review.find().estimatedDocumentCount().exec()
    .then((count)=>{
      console.log('count', count);
      realReviewId = count + 1;
      return Review.create({
        id: realReviewId,
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
          console.log('photoId', photoID);
          console.log('result.id', result.id);
          return ReviewsPhoto.create({
            id: photoID,
            review_id: result.id,
            url: photo
          })
        })
      })
    })
    .then(()=>{
      return CharacteristicView.find().estimatedDocumentCount().exec()
    })
    .then((charViewId)=>{
      console.log('CVI', charViewId);
      _.forEach(reviewObj.characteristics, (key, val)=>{
        CharacteristicView.create({
          id: charViewId + 1,
          characteristic_id : key,
          review_id : realReviewId,
          value : val
        })
        charViewId++;
      })
    })

  };


module.exports = reviewSaver;
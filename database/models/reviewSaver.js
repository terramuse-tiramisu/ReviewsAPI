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
  Review.find().estimatedDocumentCount().exec()
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

    //get next available Characteristic_views.id value
    //loop over reviewObj.characteristics
      //for each, write to Characteristic_views collection
      //next id value, characterviews.key, review id, charctervies.value
    // .then(()=> {
    //   return Characteristic.find({product_id: reviewObj.product_id}).select({id: 1, _id: 0})
    // })
    // .then((charIdArr) => {
    //   // console.log('CharIdArr', charIdArr);
    //   var trueArr = _.map(charIdArr, (val) => (
    //     val.id
    //   ))

      // console.log('trueArr', trueArr);

  };



  //returns review_id
  //_.forEach(reviewsObj.photos((photo)=>{
    //Reviews_photos.save({review_id: reviewId, url: photo})
  // }))
    //query Characteristics to get the IDs (characteristics) associated with this product
    //write to Characteristic_views, storing the characteristic ID, the review_id (coming from the firt insertion) and the values coming from reviewObj.characteristics
  //


module.exports = reviewSaver;
//write and export a function that reaches into the collections it needs to and sends it back
const {
  Reviews,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
} = require('../index');

const reviewGetter = function(prodID) {
  console.log('reviewGetter Called!, the prodID:', prodID);
  // ReviewsModel.find({prod_id : prodID}).exec()
  //   .then((data)=> {
  //     console.log('this is the data back from reviewGetter');
  //     //for each item in this collection
  //       //pull out the (reviews) id
  //       //query the reviews_photos collection for all photos with this reviewID
  //       //compose and return object that looks like the sample data with this info

  //   })
  //   .catch((err) => {
  //     console.log('err in reviewGetter.js', err)
  //   })
};

module.exports = reviewGetter;
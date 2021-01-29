var _ = require('lodash');
const {
  Reviews,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
} = require('../index');

const markHelpful = function(review_id) {
  console.log('MH, in the file of the same name, got called', review_id);
  return Reviews.findOneAndUpdate({id: review_id},
    {$inc: {'helpfulness': 1}}
    )
    .exec()
    .then((result) => {
      console.log('this is my result in MH', result);
      return result;
    });
};

module.exports = markHelpful;

  // db.items.update( { item_id: "I001" },{ $inc: { qty: 10 }});

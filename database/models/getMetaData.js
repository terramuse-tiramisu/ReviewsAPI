var _ = require('lodash');
const {
  Reviews,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
} = require('../index');

const getMetaData = function(pid) {
  console.log('gMD is called', pid);
  var packet = {
    "product_id": pid,
    "ratings": {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    "recommended": {
      0: 0,
      1: 0
    },
    "characteristics": {
    }
  };
  return Reviews.aggregate([
    {
      '$match': {
        'product_id': 111
      }
    }, {
      '$project': {
        'recommend': 1,
        'rating': 1,
        '_id': 0
      }
    }
  ]).exec()
  .then((result)=>{
     console.log('results from the agg pipeline', result);
  })
  // return Reviews.findOneAndUpdate({id: review_id},
  //   {$inc: {'helpfulness': 1}}
  //   )
  //   .exec()
  //   .then((result) => {
  //     console.log('this is my result in MH', result);
  //     return result;
  //   });
};

module.exports = getMetaData;

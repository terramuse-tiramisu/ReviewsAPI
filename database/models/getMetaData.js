var _ = require('lodash');
const {
  Review,
  ReviewsPhotos,
  Characteristic,
  CharacteristicView
} = require('../index');

//use async/await to control flow of code
const getMetaData = async function(pid) {
  console.log('gMD is called', pid);
  //set up the bones of the response, adding only the product id the rest is dummy info
  var packet = {
    product_id: pid,
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    recommended: {
      0: 0,
      1: 0
    },
    characteristics: {
    }
  };
  //result is an array
  result = await Review.aggregate([
    {
      $match: {
        'product_id': 111
      }
    }, {
      $project: {
        'recommend': 1,
        'rating': 1,
        '_id': 0
      }
    }
  ]);
  console.log('my result', result);
  _.forEach(result, (obj) => {
    packet.ratings[obj.rating] += 1;
    packet.recommended[obj.recommend] += 1
  })
  console.log('packet after blending in results', packet);
  var ratingRecs = await Characteristic.find({product_id: pid}).select({ "id": 1, "name": 1, "_id": 0})
  console.log('ratings and recs', ratingRecs);
  _.forEach((ratingRecs), (obj) => {
    packet.characteristics[obj.name] = {
      id: obj.id,
      value: 0
    }
  })
  console.log('packet after populating chars', packet);
  for (var key in packet.characteristics) {
    var [average] = await CharacteristicView.aggregate([
      {
        $match: {
          'characteristic_id': packet.characteristics[key].id
        }
      }, {
        $group: {
          '_id': null,
          'averageScore': {
            $avg: '$value'
          }
        }
      }
    ])
    console.log('average', average);
    packet.characteristics[key].value = average.averageScore.toFixed(4);;
  }
  console.log('packet after avearges added', packet);
  return packet;

};

module.exports = getMetaData;
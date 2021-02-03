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
  try {
    //result is an array of objects (one per review for this product), each one representing the rating and recommend value
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
    //loop thru this array, update the packet for this products meta data
    _.forEach(result, (obj) => {
      packet.ratings[obj.rating] += 1;
      packet.recommended[obj.recommend] += 1
    })
    //an array of objects, each object contains the charcteristic_id and name of that characteristic. Each product has b/t 1-5 chars
    var charsArr = await Characteristic.find({product_id: pid}).select({ "id": 1, "name": 1, "_id": 0})
    _.forEach((charsArr), (obj) => {
      packet.characteristics[obj.name] = {
        id: obj.id,
        value: 0
      }
    })
    console.log('packet after populating chars', packet);
    //loop through all the characteristics loaded in the packet
    //get the id for each char, then get the average value for it
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
      //put it in the packet
      packet.characteristics[key].value = average.averageScore.toFixed(4);;
    }
    console.log('packet after avearges added', packet);
    return packet;
  } catch(e) {
    console.log(e);
  }

};

module.exports = getMetaData;
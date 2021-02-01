var _ = require('lodash');
const {
  Review,
  ReviewsPhotos,
  Characteristic,
  CharacteristicView
} = require('../index');

const getMetaData = function(pid) {
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
  //this AP gives me a collection of all the recommend and rating data
  return Review.aggregate([
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
  ]).exec()
  //this block loads the data from the AP into the response packet
  .then((result)=>{
     console.log('results from the agg pipeline', result);
     _.forEach(result, (obj) => {
        packet.ratings[obj.rating] += 1;
        packet.recommended[obj.recommend] += 1
     })
     return packet;
  })
  //this block creates an array containing an object (containing the characteristic ID and name) of each characteristic (e.g. 'quality', 'fit', etc) associated with the product
  .then((packet) => {
    console.log('packet after rtgs and recs are entered', packet);
    return Characteristic.find({product_id: pid}).select({ "id": 1, "name": 1, "_id": 0}).exec()
  })
  // for each characteristic, I'm adding to the packet.characteristics property an
  // object, with the key the char's name (e.g. 'Quality'), and the value being an
  // object, with ID and value keys. the ID is the characteristic id, the value
  // is 0 (to be populated in the next block)
  .then((allIds) => {
    console.log('here are all the char.ids associated with this prod', allIds);
    charIdArr = [];
    _.forEach((allIds), (obj) => {
      charIdArr.push(obj.id);
      packet.characteristics[obj.name] = {
        id: obj.id,
        value: 0
      }
    })
    console.log('packet after chars are entered', packet);
    return packet;
  })
  //first we get the average value for each char
  .then((packet) => {
    _.forEach(packet.characteristics, (val, key)=>{
      console.log('val, key', val, key);
      CharacteristicView.aggregate([
        {
          $match: {
            'characteristic_id': val.id
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
      //insert that value into the packet at the right place
      .then((average)=>{
        console.log('average', average[0].averageScore);
        packet.characteristics[key].value = average[0].averageScore.toFixed(4);
        console.log('packet after inserting avg', packet);
      })
    })
    return packet;

  })
  // .then(() => {
  //   console.log('packet at the end of gMD', packet);
  //   // return packet;
  // })

};

module.exports = getMetaData;

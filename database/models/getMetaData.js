var _ = require('lodash');
const {
  Review,
  ReviewsPhotos,
  Characteristic,
  CharacteristicView
} = require('../index');

const getMetaData = function(pid) {
  console.log('gMD is called', pid);
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
  Review.aggregate([
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
  .then((result)=>{
     console.log('results from the agg pipeline', result);
     _.forEach(result, (obj) => {
        packet.ratings[obj.rating] += 1;
        packet.recommended[obj.recommend] += 1
     })
     return packet;
  })
  .then((packet) => {
    console.log('packet after rtgs and recs are entered', packet);
    return Characteristic.find({product_id: pid}).select({ "id": 1, "name": 1, "_id": 0}).exec()
  })
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
  .then((packet) => {
    _.forEach(packet.characteristics, (char)=>{
      CharacteristicView.aggregate([
        {
          $match: {
            'characteristic_id': 363
          }
        }, {
          $group: {
            '_id': null,
            'averageScore': {
              '$avg': '$value'
            }
          }
        }
      ])
      .then((average)=>{
        packet.characteristics.char.value = average
      })
      return packet;
    })
  })

};

module.exports = getMetaData;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected, but what does it mean');
  const reviewsSchema = new Schema({
    review_id:  Number,
    product_id: Number,
    rating: Number,
    summary:   String,
    recommend: Boolean,
    response: String,
    body: String,
    date: String,
    reviewer_name: String,
    helpfulness:  Number,
    Photos: [{id: Number, url: String}],
    name: String,
    email: String,
    characteristics: {
      “14”: Number,
      “15”: Number,
      “16”: Number,
      “17”: Number,
      “18”: Number,
      “19”: Number
    },
    Report_count: Number
      });
    const reviews_meta = new Schema({
    product_id: Number,
    ratings: {
      “1”: Number,
      “2”: Number,
      “3”: Number,
      “4”: Number,
      “5”: Number
    },
    recommend:  {
            0: Number,
            1: Number
    },
    characteristics: {
      Size: {id: Number, value: Number},
      Width: {id: Number, value: Number},
      Comfort: {id: Number, value: Number},
      Quality: {id: Number, value: Number},
      Length: {id: Number, value: Number},
              Fit: {id: Number, value: Number}
    },
      });

});
let Reviews = mongoose.model('Reviews', reviewsSchema);
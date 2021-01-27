const mongoose = require('mongoose');
const URL = 'mongodb://localhost/reviews';

const db = mongoose.connection;


mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if(err) throw err;
  // console.log(db);
  // db.close();
});


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected, but what does it mean');

});

var reviewsSchema = mongoose.Schema({
    review_id:  Number,
    product_id: Number,
    rating: Number,
    date: String,
    summary:   String,
    body: String,
    recommend: Boolean,
    reported: Boolean,
    reviewer_name: String,
    reviewer_email: String,
    response: String,
    helpfulness:  Number
})

// module.exports = mongoose.model('Reviews', reviewsSchema);
let Reviews = mongoose.model('Reviews', reviewsSchema);

var testData = new Reviews({
  review_id:  1,
  product_id: 1,
  rating: 5,
  date: "2019-01-01",
  summary: "This product was great!",
  body: "I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",
  recommend: true,
  reported: false,
  reviewer_name: "funtime",
  reviewer_email: "first.last@gmail.com",
  helpfulness:  8
});

testData.save((err, res) => {
  if (err) throw err;
  console.log("Successfully added to db!");
});
// const reviews_meta = new Schema({
//   product_id: Number,
//   ratings: {
//     “1”: Number,
//     “2”: Number,
//     “3”: Number,
//     “4”: Number,
//     “5”: Number
//   },
//   recommend:  {
//           0: Number,
//           1: Number
//   },
//   characteristics: {
//     Size: {id: Number, value: Number},
//     Width: {id: Number, value: Number},
//     Comfort: {id: Number, value: Number},
//     Quality: {id: Number, value: Number},
//     Length: {id: Number, value: Number},
//             Fit: {id: Number, value: Number}
//   },
// });
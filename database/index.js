const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected, but what does it mean');
});

const reviewsSchema = new mongoose.Schema({
  "id" : Number,
  "product_id" : Number,
  "rating" : Number,
  "date" : String,
  "summary" : String,
  "body" : String,
  "recommend" : Boolean,
  "reported" : Boolean,
  "reviewer_name" : String,
  "reviewer_email" : String,
  "response" : String,
  "helpfulness" : Number
});

const reviewsPhotoSchema = new mongoose.Schema({
  "id" : Number,
  "review_id" : Number,
  "url" : String
});

const characteristicSchema = new mongoose.Schema({
  // "_id" : String,
  "id" : Number,
  "product_id" : Number,
  "name" : String
});

const characteristicViewSchema = new mongoose.Schema({
  // "_id" : String,
  "id" : Number,
  "characteristic_id" : Number,
  "review_id" : Number,
  "value" : Number
});

//creating models for my four collections
const Review = mongoose.model(
  'Review',
  reviewsSchema,
  'reviews'
);

const ReviewsPhoto = mongoose.model(
  'ReviewsPhoto',
  reviewsPhotoSchema,
  'reviewsPhotos'
);

const Characteristic = mongoose.model(
  'Characteristic',
  characteristicSchema,
  'characteristics'
);

const CharacteristicView = mongoose.model(
  'CharacteristicView',
  characteristicViewSchema,
  'characteristicViews'
);


module.exports = {
  Review,
  ReviewsPhoto,
  Characteristic,
  CharacteristicView
}

// let Reviews = mongoose.model('Reviews', reviewsSchema);
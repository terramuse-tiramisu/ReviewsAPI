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

const reviewsPhotosSchema = new mongoose.Schema({
  "_id" : String,
  "id" : Number,
  "review_id" : Number,
  "url" : String
});

const characteristicsSchema = new mongoose.Schema({
  "_id" : String,
  "id" : Number,
  "product_id" : Number,
  "name" : String
});

const characteristicViewSchema = mongoose.model(
  "_id" : String,
  "id" : Number,
  "characteristic_id" : Number,
  "review_id" : Number,
  "value" : Number
);

//creating models for my four collections
const Reviews = mongoose.model(
  'Reviews',
  reviewsSchema,
  'reviews'
);

const ReviewsPhotos = mongoose.model(
  'ReviewsPhotos',
  reviewsPhotosSchema,
  'reviewsPhotos'
);

const Characteristics = mongoose.model(
  'Characteristics',
  characteristicsSchema,
  'characteristics'
);

const CharacteristicView = mongoose.model(
  'CharacteristicView',
  CharacteristicViewSchema,
  'characteristicView'
);


module.exports = {
  Reviews,
  ReviewsPhotos,
  Characteristics,
  CharacteristicView
}

// let Reviews = mongoose.model('Reviews', reviewsSchema);
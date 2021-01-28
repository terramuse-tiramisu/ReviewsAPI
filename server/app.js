const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const models = require('../database/models');
const reviewGetter = require('../database/models/reviewGetter');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json('Hello World');
});



app.get('/reviews', (req, res) => {
  // console.log('req.query.product_id', req.query.product_id);
  // console.log('req.query.page', req.query.page);
  // console.log('req.query.count', req.query.count);
  // console.log('req.query.sort', req.query.sort);
  const { product_id, page, count, sort} = req.query;
  console.log('prod id after destructure', product_id);
  // console.log('my get to review was hit. here is the prod id', req.params.productId);
  // console.log('req.parms', req.params);
  var noPhotos = reviewGetter(product_id, page, count, sort)
  // console.log('noPhotos', noPhotos);
  res.send('hello from /reviews')
})

app.get('/reviews/meta', (req, res) => {
  res.send('hello from /reviews/meta')
})

app.post('/reviews', (req, res) => {
  res.send('hello from /reviews (post)')
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log('here is the review id:', req.params.review_id);
  res.send('hello from PUT helpful')
})

app.get('/reviews/:review_id/report', (req, res) => {
  console.log('here is the review id:', req.params.review_id);
  res.send('hello from PUT report')
})

module.exports = app;
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
  const { product_id, page, count, sort} = req.query;
  console.log('prod id after destructure', product_id);

  reviewGetter(product_id, page, count, sort)
    .then((resultPacket) => {
      console.log('resultPacket', resultPacket);
      res.send(resultPacket);
    })
    .catch((err)=>{
      console.error(err);
    })
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
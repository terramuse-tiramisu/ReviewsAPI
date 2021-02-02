const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const models = require('../database/models');
const reviewGetter = require('../database/models/reviewGetter');
const reportReview = require('../database/models/reportReview');
const markHelpful = require('../database/models/markHelpful');
const reviewSaver = require('../database/models/reviewSaver');
const getMetaData = require('../database/models/getMetaData');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json('Hello World');
});



app.get('/reviews', (req, res) => {
  const { product_id, page, count, sort} = req.query;
  console.log('prod id after destructure', product_id);

  reviewGetter(product_id, page, count, sort)
    .then((resultPacket) => {
      console.log('resultPacket', resultPacket);
      res.sendStatus(200).send(resultPacket);
    })
    .catch((err)=>{
      console.error(err);
      res.sendStatus(500);
    })
})

app.get('/reviews/meta', (req, res) => {
  getMetaData(req.query.product_id)
    .then((results)=>{
      console.log('packet to send to client', results);
      res.send(results);
    })
    .catch((err)=>{
      console.error(err);
      res.sendStatus(500);
    })
})

app.post('/reviews', (req, res) => {
  // console.log('req.body', req.body);
  reviewSaver(req.body)
    .then((results) => {
      res.sendStatus(204);
    })
    .catch((err)=>{
      console.error(err);
      res.sendStatus(500);
    })
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  const { review_id } = req.params;
  // console.log('helpful route, review_id', review_id);
  markHelpful(review_id)
    .then((results) => {
      res.sendStatus(204);
    })
    .catch((err)=>{
      console.error(err);
      res.sendStatus(500);
    })
})

app.put('/reviews/:review_id/report', (req, res) => {
  const { review_id } = req.params;
  reportReview(review_id)
  .then((results) => {
    res.sendStatus(204);
  })
  .catch((err)=>{
    console.error(err);
    res.sendStatus(500);
  })
})

module.exports = app;
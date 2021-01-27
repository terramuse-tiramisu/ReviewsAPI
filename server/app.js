const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json('Hello World');
});



app.get('/reviews', (req, res) => {
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
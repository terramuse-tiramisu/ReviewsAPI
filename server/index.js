require('dotenv').config();
const app = require('./server.js');
// const PORT = process.env.PORT;
const PORT = 3000;


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

app.listen(PORT, () => {
  console.log(`listening on ${PORT}, visit: http://localhost:${PORT}`);
});
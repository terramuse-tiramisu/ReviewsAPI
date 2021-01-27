require('dotenv').config();
const app = require('./app.js');
// const PORT = process.env.PORT;
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}, visit: http://localhost:${PORT}`);
});
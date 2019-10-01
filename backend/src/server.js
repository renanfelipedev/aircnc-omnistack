require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

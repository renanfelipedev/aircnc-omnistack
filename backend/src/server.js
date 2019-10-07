require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

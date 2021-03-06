require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');
const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});
app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

const port = process.env.PORT || 3333;
const url = process.env.URL || 'http://localhost';

server.listen(port, () => {
  console.log(`Server running on ${url}:${port}`);
});

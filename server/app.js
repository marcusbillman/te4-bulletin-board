const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.io = io;
  next();
});

const messagesRouter = require('./routes/v1/messages');
app.use('/api/v1/messages', messagesRouter);

module.exports = { app, server };

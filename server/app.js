const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const { PrismaClient } = require('@prisma/client');

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

global.prisma = new PrismaClient();

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
const boardsRouter = require('./routes/v1/boards');
app.use('/api/v1/messages', messagesRouter);
app.use('/api/v1/boards', boardsRouter);

module.exports = { app, server };

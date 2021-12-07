const express = require('express');
const router = express.Router();
const { Message } = require('../../models/');

// GET all messages
router.get('/', function (req, res, next) {
  const messages = await Message.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.json(messages);
  s;
});

// POST a message
router.post('/', function (req, res, next) {
  const message = await Message.create({
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(201).json(message);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Message } = require('../../models/');

// GET all messages
router.get('/', async function (req, res, next) {
  const messages = await Message.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.json(messages);
});

// POST a message
router.post('/', async function (req, res, next) {
  if (!req.body.body) {
    return res.status(400).json({
      error: 'Message body is required',
    });
  }

  const message = await Message.create({
    ...req.body,
    type: getMessageType(req.body.body),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).json(message);

  res.io.emit('message', message);
});

function getMessageType(body) {
  if (isUrl(body)) {
    if (isImageUrl(body)) return 'image';
    return 'link';
  }
  return 'text';
}

function isUrl(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?[^\\s]+\\.[^\\s]+$', 'i');
  return !!pattern.test(str);
}

function isImageUrl(url) {
  const extension = url.split('.').pop();
  return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'tiff', 'bmp'].includes(
    extension
  );
}

module.exports = router;

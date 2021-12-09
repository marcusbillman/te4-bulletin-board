const express = require('express');
const router = express.Router();
const { Message } = require('../../models/');
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require('unique-names-generator');

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
    pinned: req.body.pinned,
    author: req.body.author || getRandomAuthor(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).json(message);

  res.io.emit('message', message);
});

router.delete('/:id', async function (req, res, next) {
  await Message.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).send();

  res.io.emit('delete', req.params.id);
});

function getMessageType(body) {
  if (isUrl(body)) {
    if (isImageUrl(body)) return 'image';
    return 'link';
  }
  return 'text';
}

function getRandomAuthor() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    style: 'capital',
    separator: ' ',
    length: 2,
  });
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

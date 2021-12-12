const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require('unique-names-generator');

const prisma = new PrismaClient();

// GET all messages
router.get('/', async function (req, res, next) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST a message
router.post('/', async function (req, res, next) {
  if (!req.body.body) {
    return res.status(400).json({
      error: "Message can't be blank",
    });
  }
  if (req.body.body.length > 250) {
    return res.status(400).json({
      error: "Message can't be longer than 250 characters",
    });
  }

  try {
    const message = await prisma.message.create({
      data: {
        ...req.body,
        type: getMessageType(req.body.body),
        pinned: req.body.pinned,
        author: req.body.author || getRandomAuthor(),
      },
    });
    res.status(201).json(message);
    res.io.emit('message', message);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    await prisma.message.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(204).send();
    res.io.emit('delete', req.params.id);
  } catch (error) {
    next(error);
  }
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

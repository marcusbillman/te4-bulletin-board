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

  let type = 'text';
  if (isUrl(req.body.body)) type = 'link';

  const message = await Message.create({
    ...req.body,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).json(message);

  res.io.emit('message', message);
});

function isUrl(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(str);
}

module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET a board by id
router.get('/:id', async function (req, res, next) {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        messages: true,
      },
    });
    if (!board) {
      return res
        .status(404)
        .json({ error: `Board ${req.params.id} not found` });
    }
    res.json(board);
  } catch (err) {
    next(err);
  }
});

// POST a board
router.post('/', async function (req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({
      error: 'Board id is required',
    });
  }

  try {
    const board = await prisma.board.create({
      data: {
        id: req.body.id,
      },
      include: {
        messages: true,
      },
    });
    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

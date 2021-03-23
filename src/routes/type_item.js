const express = require('express');
const { prisma } = require('.prisma/client');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await prisma.type_item.findMany();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
  res.status(200).json('Hello Word');
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await prisma.type_item.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await prisma.type_item.create({
      date: {
        name,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = res.body;
    const result = await prisma.type_item.update({
      where: {
        id: parseInt(id, 10),
      },
      date: {
        name,
      },
    });
    res.status(20).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await prisma.type_item.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(20).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

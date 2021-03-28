const { v4: uuidv4 } = require('uuid');

const express = require('express');

const prisma = require('../prismaClient');
const itemValidation = require('../validations/itemValidation');

const router = express.Router();
/**
 * An item
 * @typedef {object} Item
 * @property {string} name.required - The name
 * @property {number} value.required - The value
 * @property {boolean} isActive - Actived type or not
 * @property {string} createdAt - Creation date
 * @property {string} updateddAt - Modification date
 * @property {string} typeItemId - id du type_item
 */

/**
 * GET /api/v1/type_item
 * @summary this route get all items
 * @tags item
 * @return {array<Item>} 200 - success response - application/json
 * @return {object} 404 - not found response
 * @example response - 200 - success response example
 * []
 */
router.get('/', async (req, res, next) => {
  try {
    const results = await prisma.item.findMany();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/item/{id}
 * @summary this route get only one item
 * @tags item
 * @param {string} id.path.required
 * @return {object} 200 - success response - the selected type_item
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await prisma.item.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/type_item
 * @summary this route add a type_item
 * @tags type_item
 * @param {Item} request.body.required - type_item to add
 * @return {object} 201 - success response - Added type_item
 */
router.post('/', itemValidation, async (req, res, next) => {
  try {
    const { name, isActive, imgUrl, typeItemId, price } = req.body;
    const result = await prisma.item.create({
      data: {
        id: uuidv4(),
        name,
        isActive,
        price: price * 10000,
        img_url: imgUrl,
        typeItem: {
          connect: {
            id: typeItemId,
          },
        },
      },
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/v1/item
 * @summary this route update an item
 * @tags item
 * @param {Item} request.body.required - item to add
 * @return {object} 201 - success response - Added type_item
 */
router.put('/:id', itemValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, isActive, updatedAt, imgUrl, typeItemId, price } = req.body;
    const result = await prisma.item.update({
      where: {
        id,
      },
      data: {
        name,
        isActive,
        updatedAt,
        price: price * 10000,
        img_url: imgUrl,
        typeItem: {
          connect: {
            id: typeItemId,
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/v1/item/{id}
 * @summary this route delete a type_item
 * @tags item
 * @param {string} id.path.required
 * @return {} 200 - success response
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await prisma.item.delete({
      where: {
        id,
      },
    });
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

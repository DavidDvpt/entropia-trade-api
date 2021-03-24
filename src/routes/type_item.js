const { v4: uuidv4 } = require('uuid');

const express = require('express');

const prisma = require('../prismaClient');
const typeItemValidation = require('../validations/typeItemValidation');

const router = express.Router();

/**
 * A type_item
 * @typedef {object} Type_item
 * @property {string} name.required - The name
 * @property {boolean} isActive - Actived type or not
 * @property {string} createdAt - Creation date
 */

/**
 * GET /api/v1/type_item
 * @summary this route get all type_items
 * @tags type_item
 * @return {array<Type_item>} 200 - success response - application/json
 * @return {object} 404 - not found response
 * @example response - 200 - success response example
 * []
 */
router.get('/', async (req, res, next) => {
  try {
    const results = await prisma.type_item.findMany();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/type_item/{id}
 * @summary this route get all type_items
 * @tags type_item
 * @param {string} id.path.required
 * @return {object} 200 - success response - the selected type_item
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await prisma.type_item.findUnique({
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
 * @param {Type_item} request.body.required - type_item to add
 * @param {boolean} isActive type active or not (default true)
 * @return {object} 201 - success response - Added type_item
 */
router.post('/', typeItemValidation, async (req, res, next) => {
  try {
    const { name, isActive } = req.body;
    const result = await prisma.type_item.create({
      data: {
        id: uuidv4(),
        name,
        isActive,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 *  * PUT /api/v1/type_item/{id}
 * @summary this route update a type_item
 * @tags type_item
 * @param {string} id.path.required
 * @param {Type_item} request.body.required - type_item to update
 * @return {object} 200 - success response - Updated type_item
 */
router.put('/:id', typeItemValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    const result = await prisma.type_item.update({
      where: {
        id,
      },
      data: {
        name,
        isActive,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/v1/type_item/{id}
 * @summary this route delete a type_item
 * @tags type_item
 * @param {string} id.path.required
 * @return {} 200 - success response
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await prisma.type_item.delete({
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

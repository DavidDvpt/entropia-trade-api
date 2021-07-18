const { v4: uuidv4 } = require('uuid');

const express = require('express');

const prisma = require('../prismaClient');

const router = express.Router();

/**
 * A type_item
 * @typedef {object} Stock
 * @property {number} item_id.required - item id
 * @property {number} stock - item quantity stocked
 * @property {number} on_sale - item quantity on sale
 * @property {number} sold - item quantity solded
 * @property {string} updatedAt - Creation date
 */

/**
 * GET /api/v1/type_item
 * @summary this route get all stock tuples
 * @tags type_item
 * @return {array<stock>} 200 - success response - application/json
 * @return {object} 404 - not found response
 * @example response - 200 - success response example
 * []
 */
router.get('/', async (req, res, next) => {
  try {
    const results = await prisma.stock.findMany();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

const express = require('express');
const typeItem = require('./type_item');
const item = require('./item');

const router = express.Router();

router.use('/type_item', typeItem);
router.use('/item', item);

router.get('/', (req, res) => {
  res.status(200).json('Hello Word');
});
module.exports = router;

const express = require('express');
const typeItem = require('./type_item');

const router = express.Router();

router.use('/type_item', typeItem);

router.get('/', (req, res) => {
  res.status(200).json('Hello Word');
});
module.exports = router;

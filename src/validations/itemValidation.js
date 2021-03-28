const Joi = require('joi');
const process = require('./process');

const itemValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    imgUrl: Joi.string().max(150).required(),
    price: Joi.number().precision(5).required(),
    isActive: Joi.boolean(),
    updatedAt: Joi.date(),
    typeItemId: Joi.string().required(),
  });

  return process(req, res, next, schema);
};

module.exports = itemValidation;

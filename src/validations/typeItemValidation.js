const Joi = require('joi');
const process = require('./process');

const typeItemValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
  });

  return process(req, res, next, schema);
};

module.exports = typeItemValidation;

/**
 * Validation process for all validations schema
 */
function process(req, res, next, schema) {
  // test and validate rules
  const result = schema.validate(req.body);

  // send errors to front if errors
  if (result.error) {
    const errors = result.error.details.map((e) => e.message);

    res.status(422).send(errors);
  } else {
    // if no error, got to next middleware
    next();
  }
}

module.exports = process;

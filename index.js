const _ = require("lodash");

module.exports = (Joi) => {
  return (schema, partial) => {
    //Before we remove extra fields from the schema we need to make sure the user does not pass any
    //additional fields that are not part of the schema
    const fieldsToPatch = Object.keys(partial);
    fieldsToPatch.forEach((x) => {
      if (!schema[x]) return Joi.object(schema).validate(partial); //If the field is not part of the schema, then validate it against the original schema to return the proper error message
    });

    //At this point we know that the request does not contain extra fields so we can use lodash
    //to only pick the fields that need to be validated
    return Joi.object(_.pick(schema, fieldsToPatch)).validate(partial);
  };
};

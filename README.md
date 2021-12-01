# joi-validate-partial

This is a small NODE package that is meant to be used with the validation library Joi. It allows you to validate partial documents.
This is usefull when you have PATCH requests that do not contain the entire document.

USAGE

npm i joi-validate-partial

const Joi=require("joi");

Joi.validatePartial = require("joi-validate-partial")(Joi); //Do this one time at the start of your application

Once initilized just use Joi.validatePartial in the exact same way you use Joi.validate.

IMPORTANT NOTE: This is not a replacement to Joi.validate for CREATE operations because it will bypass required fields. This should only be used for PATCH requests where you are receiving partial documents to update. 

HOW IT WORKS

If you want to know how it works just take a look at the source code as it is only a few lines. In short it just modifies your schema on the fly to remove any fields that were not included in the partial document. After updating the schema it runs Joi.validate the usual way and returns the result. This is ideal for PATCH requests where you need to update a document but do not have the full document. This is not a replacement for the built in validate function in Joi because it will bypass required fields. 

EXAMPLE

const Joi=require("joi");

Joi.validatePartial = require("joi-validate-partial")(Joi); //Do this one time at the start of your application. This does not need to be in each individual module that uses Joi

const schema = {
name:Joi.string().required().min(3),
description:Joi.string().required().min(3)
}

//Joi.validatePartial returns the result of Joi.object().validate();

Joi.validatePartial(schema,{name:"Bob"}); //This will pass validation even though description is required

Joi.validatePartial(schema,{description:"Just an average coder"}); //This will pass validation

Joi.validatePartial(schema,{name:"Bo"}); //This will fail validation because it does not meet the min character requirement

Joi.validatePartial(schema,{random:"Bob"}); //This will fail validation because "random" is not a key in the original schema

//You can use this just just like you would use the Joi.object.validate();

const {error} = Joi.validatePartial(schema,{name:"Bob"});

if(error) {
//Do some logic to inform the client of the error
}


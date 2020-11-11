# joi-validate-partial

This is a small NODE package that is meant to be used with the validation library Joi. It allows you to validate partial documents.
This is usefull when you have PATCH requests that do not contain the entire document.

USAGE

npm i joi-validate-partial

const Joi=require("joi");
Joi.validatePartial = require("joi-validate-partial")(Joi); //Do this one time at the start of your application

EXAMPLE

const Joi=require("joi");
Joi.validatePartial = require("joi-validate-partial"); //Do this one time at the start of your application

const schema = {
name:Joi.string().required().min(3),
description:Joi.string().required().min(3)
}

//Joi.validatePartial returns the result of Joi.object().validate();

Joi.validatePartial(schema,{name:"Bob"}); //This will pass validation
Joi.validatePartial(schema,{description:"Just an average coder"}); //This will pass validation
Joi.validatePartial(schema,{random:"Bob"}); //This will fail validation because "random" is not a key in the original schema

//You can use this just just like you would use the Joi.object.validate();
const {error} = Joi.validatePartial(schema,{name:"Bob"});
if(error) return "Some Logic"; //Joi populates the error object if there is an error and you can return this to the client

console.log()

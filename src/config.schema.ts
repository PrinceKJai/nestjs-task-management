import * as Joi from "@hapi/joi";

//Created this validation schema function for scenarios where we forgot to provide 
//config variables values then we do not have a proper error message to know what went wrong.
//This schema validation will help us know the exact issues with config files, if any
export const ConfigValidationSchema = Joi.object({
 STAGE: Joi.string().required(),
 DB_HOST: Joi.string().required(),
 DB_PORT: Joi.number().default(5432).required(),
 DB_USERNAME: Joi.string().required(),
 DB_PASSWORD: Joi.string().required(),
 DB_DATABASE: Joi.string().required(),
});
import Joi from "joi";

export const registerSchema = {
    body: Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        gender:Joi.string().valid('male', 'female').required(),
        phone: Joi.string().required(),
    }),
    query: Joi.object({
        test: Joi.string().required(),
    })
}
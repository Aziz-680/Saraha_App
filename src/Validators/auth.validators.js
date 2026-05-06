import Joi from "joi";
import { GENDER } from "../Common/index.js";

export const registerSchema = {
    body: Joi.object({
        firstName: Joi.string().alphanum().required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email({ tlds: { allow: ['com', 'org'] } }).required(),
        password: Joi
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.pattern.base':'Password must contain at least one uppercase letter, one lowercase letter',
            'any.required':'Password cannot be empty'
        }),
        gender: Joi.string().valid(...Object.values(GENDER)).required(),
        phone: Joi.string().length(11).required(),
    })
}
import Joi from "joi";
import { GENDER } from "../Common/index.js";

export const registerSchema = {
    body: Joi.object({
        firstName: Joi.string().alphanum(),
        lastName: Joi.string().min(2).max(50),
        email: Joi
        .string()
        .email({ tlds: { allow: ['com', 'org'] } , multiple:true , separator:'$'})
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
                'any.required': 'Password cannot be empty'
            }),
        password: Joi
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .messages({
                'string.pattern.base': 'Phone number must contain only numbers.',
                'string.length': 'Phone number must be exactly 11 digits long.'
            }),
        confirmPassword: Joi.valid( Joi.ref('password')),
        gender: Joi.string().valid(...Object.values(GENDER)),
        phone: Joi.string().length(11),
        isBoolean : Joi.boolean().truthy('yes').falsy('no').sensitive(true),
        date: Joi.date().greater(Date.now()),
    })
    .with('email' , 'password')
    .with('password' , 'confirmPassword')
    // .options({presence:'optional'})
}





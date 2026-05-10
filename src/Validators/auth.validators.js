import Joi from "joi";
import { GENDER } from "../Common/index.js";
import { generalValidators } from "../Common/validators/general.validators.js";

export const registerSchema = {
    body: Joi.object({
        firstName: Joi.string().alphanum(),
        lastName: Joi.string().min(2).max(50),
        email: generalValidators.email,
        password: generalValidators.password,
        confirmPassword: Joi.valid( Joi.ref('password')),
        gender: Joi.string().valid(...Object.values(GENDER)),
        phone: Joi.string().length(11),
        isBoolean : Joi.boolean().truthy('yes').falsy('no').sensitive(true),
        date: Joi.date().greater(Date.now()),
        skills: Joi.array().ordered(Joi.string() , Joi.number()).required(),
        userId:generalValidators._id
    })
    .with('email' , 'password')
    .with('password', 'confirmPassword')
    // .options({presence:'optional'})
}
import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    mail: Joi.string().max(100).required()
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required()

const updateUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    token: Joi.optional(),
    updateToken: Joi.optional(),
    password: Joi.string().max(100).optional(),
    email: Joi.string().max(100).optional()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
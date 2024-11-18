import Joi from "joi";

const createContactValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).required()

});

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).optional(),
    email: Joi.string().max(100).optional(),
    phone: Joi.string().max(20).optional(),
});

const getContactValidation = Joi.number().positive().required()

const searchContactValidation = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    page: Joi.number().integer().default(1), // Default ke halaman pertama
    size: Joi.number().integer().default(10) // Default ke 10 item per halaman
});

export {
    createContactValidation,
    updateContactValidation,
    getContactValidation,
    searchContactValidation
}
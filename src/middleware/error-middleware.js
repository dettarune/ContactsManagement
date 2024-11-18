import { ResponseError } from "/home/detarune/Pictures/newFolderContacts/src/error/response_error.js";
import Joi from 'joi';

const { ValidationError } = Joi;
const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        return next(); // lebih eksplisit
    }

    if (err instanceof ResponseError) {
        return res.status(err.status).json({
            errors: err.message // perbaiki typo "errros"
        }).end();
    }

    if (err instanceof ValidationError) {
        return res.status(400).json({
            errors: err.message
        }).end();
    }

    // Default: Error 500
    return res.status(500).json({
        errors: err.message
    }).end();
};

export { errorMiddleware };

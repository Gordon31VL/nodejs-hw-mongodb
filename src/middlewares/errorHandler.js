import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (isHttpError(err)) {
        res.status(err.status).json({
            status: err.status,
            message: err.message,
            data: err
        });
        return;
    }

    if (err.name === 'CastError') {
        res.status(400).json({
            status: 400,
            message: 'Invalid ID format',
            data: 'The provided ID is not a valid MongoDB ObjectId'
        });
        return;
    }

    if (err.name === 'ValidationError') {
        res.status(400).json({
            status: 400,
            message: 'Validation failed',
            data: err.message
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message
    });
};
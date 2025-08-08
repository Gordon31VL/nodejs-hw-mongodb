import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
    try {
        console.log('Body для валідації:', req.body); // Додайте це
        const { error } = schema.validate(req.body);
        if (error) {
            console.log('Помилка валідації:', error.details); // Додайте це
            throw createHttpError(400, `Validation error: ${error.details.map(detail => detail.message).join(', ')}`);
        }
        next();
    } catch (err) {
        next(err);
    }
};
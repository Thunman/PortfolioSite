import Joi from "joi";

export const gameStateSchema = Joi.object({
    score: Joi.number().required(),
    timeLeft: Joi.number().required(),
    circles: Joi.array().items(
        Joi.object({
            color: Joi.string().valid("red", "green", "blue", "white").required(),
            id: Joi.number().required(),
            top: Joi.string().required(),
            left: Joi.string().required()
        })
    ).required()
});

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});
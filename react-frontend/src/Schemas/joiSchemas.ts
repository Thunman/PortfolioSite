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
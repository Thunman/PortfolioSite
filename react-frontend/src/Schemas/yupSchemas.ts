import * as yup from "yup"

export const userSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export const gameStateSchema = yup.object({
    score: yup.number().required(),
    timeLeft: yup.number().required(),
    circles: yup.array().of(
        yup.object({
            color: yup.string().oneOf(["red", "green", "blue", "white"]).required(),
            id: yup.number().required(),
            top: yup.string().required(),
            left: yup.string().required()
        })
    ).required()
});

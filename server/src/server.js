import dotenv from "dotenv";
import express from "express";
import https from "https";
import fs from "fs";
import userRouter from "./routes/users.js";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const mongoURL = process.env.MONGOURI;

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

app.use(express.static(resolve(__dirname, '../../react-frontend/build')));
/*
app.get("/", (req, res) => {
    res.sendFile(path.resolve("../client/newUser.html"));
});*/

const port = process.env.PORT || 3000;
const options = {
    key: fs.readFileSync(process.env.KEYPATH),
    cert: fs.readFileSync(process.env.CERTPATH),
};
const server = https.createServer(options, app);

const startServer = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");
        server.listen(port, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`server is running on port: ${port}`);
            }
        });
    } catch (error) {
        console.error(error);
    }
};

const stopServer = async () => {
    try {
        server.close();
    } catch (error) {
        console.error(error);
    }
};

export {startServer, stopServer};

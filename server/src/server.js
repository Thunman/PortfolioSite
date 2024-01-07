import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import express from "express";
import https from "https";
import fs from "fs";
import userRouter from "../src/routes/userRoutes.js";
import path from "path";


dotenv.config();

const mongoURL = process.env.MONGOURI;
const client = new MongoClient(mongoURL);


const app = express();
app.use(express.json());
app.use(("/api/users"), userRouter);
app.get("/", (req, res) => {
    res.sendFile(path.resolve("../client/newUser.html"));
});

const port = process.env.PORT || 3000;
const options = {
    key: fs.readFileSync(process.env.KEYPATH),
    cert: fs.readFileSync(process.env.CERTPATH),
};
const server = https.createServer(options, app);

const startServer = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        server.listen(port, (error) => {
            if (error) {
                console.log("Thunman f'ed up. Error: ", error);
            } else {
                console.log("Server is running on port: ", port);
            }
        });
    } catch (error) {
        console.log("Error connecting to DB " + error);
    }
}

const stopServer = async () => {
    try {
        server.close();
        console.log("Server stopped");
    } catch (error) {
        console.log("Error stopping server: " + error);
    }
}

export {startServer, stopServer, app, client}



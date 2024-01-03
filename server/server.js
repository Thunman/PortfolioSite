import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import express from "express";
import https from "https";
import fs from "fs";
import { Console } from "console";
import { getSystemErrorMap } from "util";

const mongoURL = process.env.MONGOURI;
const client = new MongoClient(mongoURL);


const app = express();
const port = process.env.PORT || 3000;
const options = {
    key: fs.readFileSync(process.env.KEYPATH),
    cert: fs.readFileSync(process.env.CERTPATH),
};
const server = https.createServer(options, app);

async function startServer() {
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

async function stopServer() {
    try {
        await server.close();
        console.log("Server stopped");
    } catch (error) {
        console.log("Error stopping server: " + error);
    }
}

startServer();

console.log("To stop server, type 'stop'");
process.stdin.on("data", (data) => {
    if (data.toString().trim().toLowerCase() === "stop") {
        stopServer();
        process.exit();
    }
});

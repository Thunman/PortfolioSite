require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");

const port = process.env.PORT || 3000;
const options = {
    key: fs.readFileSync(process.env.KEYPATH),
    cert: fs.readFileSync(process.env.CERTPATH),
};

const server = https.createServer(options, app).listen(port, (error) => {
    if (error) {
        console.log("Thunman f'ed up. Error: ", error);
    } else {
        console.log("Server is running on port: ", port);
    }
});
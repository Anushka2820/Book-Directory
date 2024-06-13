require('dotenv').config();
const cors = require("cors");
const express = require("express");
const framework = require("./common/framework.js");
const signIn = require("./service/func/common/signIn.js");
const searchRecord = require("./service/func/common/search.js");
const createRecord = require("./service/func/book/createRecord.js");
const deleteRecord = require("./service/func/book/deleteRecord.js");
const updateRecord = require("./service/func/book/updateRecord.js");

const app = express();

let sanitizeArray = ["userId"];

app.use(cors());
app.use(express.json());
app.listen(process.env.APP_PORT_NUMBER, () => { framework.debug(`Server running at ${process.env.APP_PORT_NUMBER}`) });

app.use("/", function (_req, _res, next) {
    framework.info(`---------------- Request received at ${new Date()} ----------------`);
    next();
});

app.post("/signin", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.set('Access-Control-Allow-Origin', '*');
    let { functionResponse, status } = await framework.execute(signIn.signIn, "signIn", request, args);
    response.status(status).json(functionResponse).end();
});

// app.post("/signup", async function (request, response) {
//     let args = {
//         payload: request.body,
//         headers: request.headers,
//         params: request.params,
//         sanitizeArray: sanitizeArray
//     };
//     response.set('Access-Control-Allow-Origin', '*');
//     let { functionResponse, status } = await framework.execute(signIn.signUp, "signUp", request, args);
//     status = status ? status : 500;
//     response.status(status).json(functionResponse).end();
// });

app.post("/book", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.set('Access-Control-Allow-Origin', '*');
    let { functionResponse, status } = await framework.execute(createRecord.create, "create", request, args);
    response.status(status).json(functionResponse).end();
});

app.put("/book", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.set('Access-Control-Allow-Origin', '*');
    let { functionResponse, status } = await framework.execute(updateRecord.update, "update", request, args);
    response.status(status).json(functionResponse).end();
});

app.delete("/book", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.set('Access-Control-Allow-Origin', '*');
    let { functionResponse, status } = await framework.execute(deleteRecord.delete, "delete", request, args);
    response.status(status).json(functionResponse).end();
});

app.post("/:tableName/search", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.set('Access-Control-Allow-Origin', '*');
    let { functionResponse, status } = await framework.execute(searchRecord.search, "search", request, args);
    response.status(status).json(functionResponse).end();
});

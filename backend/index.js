const express = require("express");
require('dotenv').config();

const framework = require("./common/framework.js");
const searchRecord = require("./service/func/search.js");
const createRecord = require("./service/func/createRecord.js");
const deleteRecord = require("./service/func/deleteRecord.js");
const updateRecord = require("./service/func/updateRecord.js");

const app = express();
app.use(express.json());

let sanitizeArray = ["userId"];

app.listen(process.env.APP_PORT_NUMBER, () => { framework.debug(`Server running at ${process.env.APP_PORT_NUMBER}`) });

app.use("/", function (_req, _res, next) {
    framework.info(`---------------- Request received at ${new Date()} ----------------`);
    next();
});


app.post("/:tableName", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.json(await framework.execute(createRecord.create, "create", request, args)).end();
});

app.put("/:tableName", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.json(await framework.execute(updateRecord.update, "update", request, args)).end();
});

app.delete("/:tableName", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.json(await framework.execute(deleteRecord.delete, "delete", request, args)).end();
});

app.post("/:tableName/search", async function (request, response) {
    let args = {
        payload: request.body,
        headers: request.headers,
        params: request.params,
        sanitizeArray: sanitizeArray
    };
    response.json(await framework.execute(searchRecord.search, "search", request, args)).end();
});

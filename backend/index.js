const express = require('express');
const app = express();
const createRecord = require("./service/func/createRecord.js");
const deleteRecord = require("./service/func/deleteRecord.js");
const updateRecord = require("./service/func/updateRecord.js");
app.use(express.json());

app.post('/create', async function (request, response) {
    response.json(await createRecord.create(request.body));
    response.end();
});
app.put('/update', async function (request, response) {
    response.json(await updateRecord.update(request.body));
    response.end();
});
app.delete('/delete', async function (request, response) {
    response.json(await deleteRecord.delete(request.body));
    response.end();
});

app.listen(5000);
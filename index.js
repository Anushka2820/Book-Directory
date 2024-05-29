const express = require('express');
const app = express();
const createRecord = require("./service/func/createRecord.js");
app.use(express.json());

app.post('/create', async function (request, response) {
    response.json(await createRecord.create(request.body));
    response.end();
});

app.listen(5000);
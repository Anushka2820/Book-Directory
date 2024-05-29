const express = require('express');
const app = express();
const createRecord = require("./service/func/createRecord.js");
app.use(express.json());

app.post('/create', async function (req, res) {
    let resp = await createRecord.create(req.body);
    // console.log(resp);
    res.json(resp);
    res.end();
    // process.exit();
});

app.listen(5000);
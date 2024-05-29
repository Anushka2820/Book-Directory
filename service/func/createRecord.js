const callQueryDB = require("../subfunc/callQueryDB.js");
const bookPayload = require("../util/payloadBuilder/bookPayload.js");
const filename = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    create: async function (request) {
        try {
            console.log(`=========== ${filename} start ===========`);
            console.log(`Request:::${JSON.stringify(request)}`);
            let createPayload = await bookPayload.getCreatePayload(request);
            let insertResponse = await callQueryDB.insert(createPayload);
            return await new Promise((resolve, reject) => {
                console.log(`Response:::${JSON.stringify(insertResponse)}`);
                console.log(`=========== ${filename} exit ===========`);
                return resolve(insertResponse);
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
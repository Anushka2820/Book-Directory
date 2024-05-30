const callQueryDB = require("../subfunc/callQueryDB.js");
const filename = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    update: async function (request) {
        try {
            console.log(`=========== ${filename} start ===========`);
            console.log(`Request:::${JSON.stringify(request)}`);
            let updateResponse = await callQueryDB.update(request.name, request.status);
            return await new Promise((resolve, reject) => {
                console.log(`Response:::${JSON.stringify(updateResponse)}`);
                console.log(`=========== ${filename} exit ===========`);
                return resolve(updateResponse);
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
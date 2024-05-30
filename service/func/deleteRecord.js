const callQueryDB = require("../subfunc/callQueryDB.js");
const filename = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    delete: async function (request) {
        try {
            console.log(`=========== ${filename} start ===========`);
            console.log(`Request:::${JSON.stringify(request)}`);
            let deleteResponse = await callQueryDB.delete(request);
            return await new Promise((resolve, reject) => {
                console.log(`Response:::${JSON.stringify(deleteResponse)}`);
                console.log(`=========== ${filename} exit ===========`);
                return resolve(deleteResponse);
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
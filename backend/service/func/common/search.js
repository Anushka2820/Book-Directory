const { dbDetails } = require("../../util/appUtil.js");
const headerUtil = require("../../util/headerUtil.js");
const framework = require("../../../common/framework.js");
const callQueryDB = require("../../subfunc/callQueryDB.js");
const responseBuilder = require("../../util/responseBuilder.js");
const filename = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    search: async function (args) {
        try {
            framework.info(`=========== ${filename} start ===========`);
            let requestPayload = args.payload;
            let startTime = framework.logRequest(filename, requestPayload);
            args["headers"] = headerUtil.generateHeaders();

            let succeededResponseArray = [],
                failureResponseArray = [];

            requestPayload.query = requestPayload.query ? requestPayload.query : {};
            requestPayload.options = requestPayload.options ? requestPayload.options : {};
            requestPayload.limit = requestPayload.limit ? requestPayload.limit : 0;
            requestPayload.skip = requestPayload.skip ? requestPayload.skip : 0;
            let readResponse = await callQueryDB.read(requestPayload.query, requestPayload.options, requestPayload.limit, requestPayload.skip, dbDetails.tableName[args.params.tableName]);
            succeededResponseArray.push(readResponse);

            return await new Promise(async (resolve, _reject) => {
                let response = await responseBuilder.getResponse(args, succeededResponseArray, failureResponseArray);
                framework.logResponse(filename, response, startTime);
                framework.info(`=========== ${filename} exit ===========`);
                return resolve(response);
            });
        }
        catch (err) {
            framework.error(err);
            throw err;
        }
    }
}

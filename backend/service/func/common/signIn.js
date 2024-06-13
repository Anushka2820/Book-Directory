const crypto = require("crypto");
const { dbDetails, getJWTToken } = require("../../util/appUtil.js");
const headerUtil = require("../../util/headerUtil.js");
const framework = require("../../../common/framework.js");
const callQueryDB = require("../../subfunc/callQueryDB.js");
const responseBuilder = require("../../util/responseBuilder.js");
const filename = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    signIn: async function (args) {
        try {
            framework.info(`=========== ${filename} start ===========`);
            let requestPayload = args.payload;
            let startTime = framework.logRequest(filename, requestPayload);
            args["headers"] = headerUtil.generateHeaders();

            let succeededResponseArray = [],
                failureResponseArray = [];

            let readResponse = await callQueryDB.read({ userId: requestPayload.username }, {}, 0, 0, dbDetails.tableName.user);

            let hashedPassword = crypto.createHash("sha256").update(requestPayload.password).digest("base64");
            if (hashedPassword === readResponse.password) {
                succeededResponseArray.push({
                    isAuthorizedUser: true,
                    // authorizationToken: jwt.sign({ userId: requestPayload.username }, "secretkeyappearshere", { expiresIn: "1h" })
                    authorizationToken: getJWTToken({ userId: requestPayload.username })
                });
            } else {
                failureResponseArray.push({
                    isAuthorizedUser: false
                });
            }

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

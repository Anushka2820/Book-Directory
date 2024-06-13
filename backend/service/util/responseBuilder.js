const framework = require("../../common/framework.js");

module.exports = {
    getResponse: async function (args, succeededResponseArray, failureResponseArray) {
        try {
            let response;
            if (succeededResponseArray.length > 0 && failureResponseArray.length == 0) {
                response = processSuccess(args, succeededResponseArray);
            } else if (succeededResponseArray.length > 0 && failureResponseArray.length > 0) {
                response = processPartial(args, succeededResponseArray, failureResponseArray);
            } else if (failureResponseArray.length > 0 && succeededResponseArray.length == 0) {
                response = processFailure(args, failureResponseArray);
            }

            response.body = response.body.length === 1 ? response.body[0] : response.body;

            return Promise.resolve(response);
        }
        catch (err) {
            framework.error(err);
            return Promise.reject(err);
        }
    }
}

function processSuccess(args, succeededResponseArray) {
    return {
        status: 200,
        headers: { ...args.headers },
        body: succeededResponseArray
    }
}

function processPartial(args, succeededResponseArray, failureResponseArray) {
    return {
        status: 206,
        headers: { ...args.headers },
        body: failureResponseArray.concat(succeededResponseArray)
    }
}

function processFailure(args, failureResponseArray) {
    return {
        status: 500,
        headers: { ...args.headers },
        body: failureResponseArray
    }
}

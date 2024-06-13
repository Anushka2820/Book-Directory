const lodash = require("lodash");
const logger = require("./logger");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    info: (message, payload) => {
        logger.log("info", formatMessage(message, payload));
    },
    debug: (message, payload) => {
        logger.log("debug", formatMessage(message, payload));
    },
    error: (message, payload) => {
        logger.log("error", formatMessage(message, payload));
    },
    logRequest: (componentName, payload) => {
        logger.log("info", formatMessage(`${componentName} request ::: `, payload));
        return new Date();
    },
    logResponse: (componentName, payload, startTime) => {
        logger.log("info", formatMessage(`${componentName} response ::: `, payload));
        logger.log("info", formatMessage(`${componentName} successfully responded in ${new Date() - startTime} ms`));
    },
    execute: async (functionToInvoke, functionName, request, args) => {
        await initalize(request, functionName, args);
        let functionResponse = await functionToInvoke(args);
        return { functionResponse, status: functionResponse.status ? functionResponse.status : 500 };
    },
    getCorrId: () => {
        return global.configValues?.corrId ? global.configValues.corrId : uuidv4();
    }
}

async function initalize(request, functionName, args) {
    global.configValues = {
        corrId: request.headers["x-request-id"] ? request.headers["x-request-id"] : uuidv4(),
        sanitizeArray: args.sanitizeArray,
        functionName
    };
}

function formatMessage(message, payload) {
    let clonedPayload = lodash.cloneDeep(payload);
    if (clonedPayload && isJson(clonedPayload)) {
        for (let eachPII of global.configValues.sanitizeArray) {
            maskValue(clonedPayload, eachPII);
        }
        clonedPayload = JSON.stringify(clonedPayload, null, "\t");
    }
    return JSON.stringify({
        corrId: module.exports.getCorrId(),
        functionName: global.configValues?.functionName,
        detail: message + (clonedPayload ? clonedPayload : "")
    });
}

function isJson(message) {
    try {
        typeof message === "string" ? JSON.parse(message) : message;
        return true;
    }
    catch {
        return false;
    }
}

function maskValue(obj, target) {
    if (obj && isJson(obj)) {
        if (obj[target] !== undefined) {
            if (obj[target].length > 4) {
                obj[target] = obj[target].slice(0, -4).replace(/./g, "*") + obj[target].slice(-4);
            } else {
                obj[target] = obj[target].slice(0, -1).replace(/./g, "*") + obj[target].slice(-1);
            }
        }
        for (let subObj in obj) {
            maskValue(obj[subObj], target);
        }
    }
}

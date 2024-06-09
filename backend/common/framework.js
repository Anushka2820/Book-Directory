const lodash = require("lodash");
const logger = require("./logger");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    info: (message) => {
        logger.log("info", formatMessage(maskMessage(message)));
    },
    debug: (message) => {
        logger.log("debug", formatMessage(maskMessage(message)));
    },
    error: (message) => {
        logger.log("error", formatMessage(maskMessage(message)));
    },
    logRequest: (componentName, message) => {
        logger.log("info", formatMessage(`${componentName} request ::: ${maskMessage(message)}`));
        return new Date();
    },
    logResponse: (componentName, message, startTime) => {
        logger.log("info", formatMessage(`${componentName} response ::: ${maskMessage(message)}`));
        logger.log("info", formatMessage(`${componentName} successfully responded in ${new Date() - startTime} ms`));
    },
    execute: async (functionToInvoke, functionName, request, args) => {
        await initalize(request, functionName, args);
        return await functionToInvoke(args);
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

function formatMessage(message) {
    return JSON.stringify({
        corrId: module.exports.getCorrId(),
        functionName: global.configValues?.functionName,
        detail: message
    });
}

function maskMessage(message) {
    let clonedMessage = lodash.cloneDeep(message);
    if (isJson(clonedMessage)) {
        for (let eachPII of global.configValues.sanitizeArray) {
            maskValue(clonedMessage, eachPII);
        }
        clonedMessage = JSON.stringify(clonedMessage, null, "\t");
    }
    return clonedMessage;
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
            obj[target] = obj[target].slice(0, -4).replace(/./g, "*") + obj[target].slice(-4);
        }
        for (let subObj in obj) {
            maskValue(obj[subObj], target);
        }
    }
}

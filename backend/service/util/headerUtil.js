const framework = require("../../common/framework.js");

module.exports = {
    generateHeaders: () => {
        return {
            ["x-request-id"]: framework.getCorrId()
        }
    }
}
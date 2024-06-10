const MongoClient = require("mongodb").MongoClient;
const { dbDetails } = require("../util/appUtil.js");
const headerUtil = require("../util/headerUtil.js");
const framework = require("../../common/framework.js");
const responseBuilder = require("../util/responseBuilder.js");
const filename = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    create: async function () {
        try {
            framework.info(`=========== ${filename} start ===========`);
            let startTime = framework.logRequest(filename, "create");
            args["headers"] = headerUtil.generateHeaders();

            let succeededResponseArray = [],
                failureResponseArray = [];

            framework.info(`DB connection details ::: ${dbDetails.uri}:${dbDetails.database}`);
            const client = new MongoClient(dbDetails.uri);
            await client.connect();
            const db = client.db(dbDetails.database);

            await db.createCollection(dbDetails.tableName.book);
            // await db.collection(dbDetails.tableName.book).createIndex({ bookId: 1 }, { unique: true });

            await db.createCollection(dbDetails.tableName.user);
            await db.collection(dbDetails.tableName.user).createIndex({ userId: 1 }, { unique: true });

            await db.createCollection(dbDetails.tableName["user-activity"]);

            await client.close();

            let response = `Database [${dbDetails.database}] created with tables : [${dbDetails.tableName.book}, ${dbDetails.tableName.user}, ${dbDetails.tableName.userActivity}]`;
            succeededResponseArray.push(response);

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

module.exports.create();
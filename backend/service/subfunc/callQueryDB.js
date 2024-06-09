const MongoClient = require("mongodb").MongoClient;
const { dbDetails } = require("../util/appUtil.js");
const framework = require("../../common/framework.js");
const filename = __filename.slice(__dirname.length + 1, -3);

module.exports = {
    insert: async function (requestPayload, tableName) {
        try {
            framework.info(`=========== ${filename}.${arguments.callee.name} start ===========`);
            framework.info(`DB connection details ::: ${dbDetails.uri}:${dbDetails.database}:${tableName}`);
            let startTime = framework.logRequest(`${filename}.${arguments.callee.name}`, requestPayload);

            const client = new MongoClient(dbDetails.uri);
            await client.connect();

            const db = client.db(dbDetails.database);
            const collection = db.collection(tableName);
            let insertResponse = await collection.insertOne(requestPayload).catch(err => {
                let errorResponse = err.errmsg || err;
                if (errorResponse.includes("duplicate key error collection")) {
                    framework.info("Duplicate pkey error");
                } else {
                    framework.info(`DDB error response ::: ${err}`);
                    client.close();
                    throw err;
                }
            });
            await client.close();

            framework.logResponse(`${filename}.${arguments.callee.name}`, insertResponse, startTime);
            framework.info(`=========== ${filename}.${arguments.callee.name} exit ===========`);
            return await Promise.resolve(insertResponse);
        }
        catch (err) {
            framework.info(err);
            throw err;
        }
    },
    delete: async function (requestPayload, tableName) {
        try {
            framework.info(`=========== ${filename}.${arguments.callee.name} start ===========`);
            framework.info(`DB connection details ::: ${dbDetails.uri}:${dbDetails.database}:${tableName}`);
            let startTime = framework.logRequest(`${filename}.${arguments.callee.name}`, requestPayload);

            const client = new MongoClient(dbDetails.uri);
            await client.connect();

            const db = client.db(dbDetails.database);
            const collection = db.collection(tableName);
            let deleteResponse = await collection.deleteOne(requestPayload);
            await client.close();

            framework.logResponse(`${filename}.${arguments.callee.name}`, deleteResponse, startTime);
            framework.info(`=========== ${filename}.${arguments.callee.name} exit ===========`);
            return await Promise.resolve(deleteResponse);
        }
        catch (err) {
            framework.info(err);
            throw err;
        }
    },
    update: async function (name, status, tableName) {
        try {
            framework.info(`=========== ${filename}.${arguments.callee.name} start ===========`);
            framework.info(`DB connection details ::: ${dbDetails.uri}:${dbDetails.database}:${tableName}`);
            let startTime = framework.logRequest(`${filename}.${arguments.callee.name}`, `Name ::: [${name}] Status ::: [${status}]`);

            const client = new MongoClient(dbDetails.uri);
            await client.connect();

            const db = client.db(dbDetails.database);
            const collection = db.collection(tableName);
            framework.info();
            let updateResponse = await collection.updateOne({ name }, { $set: { status } });
            await client.close();

            framework.logResponse(`${filename}.${arguments.callee.name}`, updateResponse, startTime);
            framework.info(`=========== ${filename}.${arguments.callee.name} exit ===========`);
            return await Promise.resolve(updateResponse);
        }
        catch (err) {
            framework.info(err);
            throw err;
        }
    },
    read: async function (query, options, limit, skip, tableName) {
        try {
            framework.info(`=========== ${filename}.${arguments.callee.name} start ===========`);
            framework.info(`DB connection details ::: ${dbDetails.uri}:${dbDetails.database}:${tableName}`);
            let startTime = framework.logRequest(`${filename}.${arguments.callee.name}`, { query, options, limit, skip });

            const client = new MongoClient(dbDetails.uri);
            await client.connect();

            const db = client.db(dbDetails.database);
            const collection = db.collection(tableName);
            let readResponse = await collection.find(query, options).limit(limit).skip(skip).toArray();
            await client.close();

            framework.logResponse(`${filename}.${arguments.callee.name}`, readResponse, startTime);
            framework.info(`=========== ${filename}.${arguments.callee.name} exit ===========`);
            return await Promise.resolve(readResponse);
        }
        catch (err) {
            framework.info(err);
            throw err;
        }
    }
};
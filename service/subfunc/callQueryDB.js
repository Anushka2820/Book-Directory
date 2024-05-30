const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');
const dbUri = "mongodb://localhost:27017";
const filename = __filename.slice(__dirname.length + 1, -3);
module.exports = {
    insert: async function (requestPayload) {
        try {
            console.log(`=========== ${filename} start ===========`);
            const client = new MongoClient(dbUri);
            await client.connect();
            const db = client.db("local");
            const collection = db.collection('test');
            console.log(`Request:::${JSON.stringify(requestPayload)}`);
            const insertResponse = await collection.insertOne(requestPayload);
            console.log(`Response:::${JSON.stringify(insertResponse)}`);
            console.log(`=========== ${filename} exit ===========`);
            return await Promise.resolve(insertResponse);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    delete: async function (requestPayload) {
        try {
            console.log(`=========== ${filename} start ===========`);
            const client = new MongoClient(dbUri);
            await client.connect();
            const db = client.db("local");
            const collection = db.collection('test');
            console.log(`Request:::${JSON.stringify(requestPayload)}`);
            const deleteResponse = await collection.deleteOne(requestPayload);
            console.log(`Response:::${JSON.stringify(deleteResponse)}`);
            console.log(`=========== ${filename} exit ===========`);
            return await Promise.resolve(deleteResponse);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    update: async function (name, status) {
        try {
            console.log(`=========== ${filename} start ===========`);
            const client = new MongoClient(dbUri);
            await client.connect();
            const db = client.db("local");
            const collection = db.collection('test');
            console.log(`Name :::${name}`);
            console.log(`Status :::${status}`);
            const updateResponse = await collection.updateOne({ name }, { $set: { status } });
            console.log(`Response:::${JSON.stringify(updateResponse)}`);
            console.log(`=========== ${filename} exit ===========`);
            return await Promise.resolve(updateResponse);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};

const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
module.exports = {
    dbDetails: {
        uri: "mongodb://localhost:27017",
        database: "book-directory",
        tableName: {
            book: "book",
            user: "user",
            "user-activity": "user-activity"
        }
    },
    getJWTToken: (data) => {
        let secret = uuidv4();
        secret = secret.replace(/-/g, "");
        return jwt.sign(data, secret, { expiresIn: "1h" }) + "|" + secret;
    }
}
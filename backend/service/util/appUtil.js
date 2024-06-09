module.exports = {
    dbDetails: {
        uri: "mongodb://localhost:27017",
        database: "book-directory",
        tableName: {
            book: "book",
            user: "user",
            "user-activity": "user-activity"
        }
    }
}
const filename = __filename.slice(__dirname.length + 1, -3);
module.exports = {
    getBookPayload: async function (req, res) {
        return {
            name: req.name,
            author: req.author,
            status: "STATUS_AVAILABLE",
            totalCopies: req.totalCopies,
            availableCopies: req.availableCopies
        }
    },
    getUserPayload: async function (req, res) {
        return {
            userId: req.emailId,
            name: req.name,
            password: req.password,
            userType: req.userType
        }
    },
    getUserActivityPayload: async function (req, res) {
        return {
            userId: req.emailId,
            status: req.status,
            name: req.name
        }
    }
};          
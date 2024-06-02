const filename = __filename.slice(__dirname.length + 1, -3);
module.exports = {
    getCreatePayload: async function (req, res) {
        return {
            name: req.name,
            author: req.author,
            status: "STATUS_AVAILABLE"
        }
    }
};
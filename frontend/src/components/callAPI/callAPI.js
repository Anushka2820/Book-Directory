import axios from "axios";

const postData = async (url = "", method = "GET", data = {}) => {
    return await axios({
        url,
        method,
        data
    });
}

export default postData;
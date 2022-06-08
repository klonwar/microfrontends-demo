import axios from 'axios';

export default {
    http_get,
    http_post,
    http_delete
}


async function http_get() {
    let result = []
    await axios
        .get(API_URL + API_ENDPOINT)
        .then(response => {
            result = response.data
        })
    return result
}

async function http_post() {
    let result = {}
    await axios
        .post(API_URL + API_ENDPOINT)
        .then(response => {
            result = response
        })
    return result
}

async function http_delete() {
    let result = {}
    await axios
        .delete(API_URL + API_ENDPOINT)
        .then(response => {
            result = response
        })
    return result
}

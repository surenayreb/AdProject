import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const defaultOptions = {
    headers: {}
};

let options;

const request = async (path) => {
    options.url = path;
    return await instance.request(options);
}

export const get = async (
    path,
    params
) => {
    options = JSON.parse(JSON.stringify(defaultOptions));
    options.method = 'GET';
    options.params = {
        ...params
    };

    return await request(path);
};

export const put = async (
    path,
    data,
    params
) => {
    options = JSON.parse(JSON.stringify(defaultOptions));
    options.method = 'PUT';
    options.data = data;
    options.params = {
        ...params
    };

    return await request(path);
};

export const post = async (
    path,
    data,
    params
) => {
    options = JSON.parse(JSON.stringify(defaultOptions));
    options.method = 'POST';
    options.data = data;
    options.params = {
        ...params
    };

    return await request(path);
};

export const sendDelete = async (
    path,
    data,
) => {
    options = JSON.parse(JSON.stringify(defaultOptions));
    options.method = 'DELETE';
    options.data = data;

    return await request(path);
};

export default { get, put, post, sendDelete };
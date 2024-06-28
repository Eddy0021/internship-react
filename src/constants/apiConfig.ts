import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

interface RequestOptions {
    method?: string;
    body?: unknown;
}

export default function request(path: string, options: RequestOptions = {}){
    const { method, body } = options;

    return axios({
        url: `${BASE_URL}${path}`,
        method,
        data: body
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Request error:', error);
        let message = '';
        !error.response.data.errors ? message = error.response.data.result : message = error.response.data.errors;
        throw message;
    });
}
import axios from 'axios';

const assemblyAPI = axios.create({
    baseURL: 'https://api.assemblyai.com/v2',
    headers: {
        authorization: process.env.VITE_API_KEY,
        'content-type': 'application/json',
    },
});

export default assemblyAPI;

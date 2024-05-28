import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3.27.30.178/api', //  Flask server's address
});

export default api;

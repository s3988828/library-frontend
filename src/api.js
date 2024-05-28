import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.27.30.178:5000', //  Flask server's address
});

export default api;

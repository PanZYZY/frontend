import axios from 'axios';
// Use for Android emulator
const api = axios.create({
    baseURL: 'http://10.0.2.2:3000',
});

export default api;

import axios from "axios";

const BackendUrl = 'http://127.0.0.1:8000/api/';
const mediaUrl = 'http://127.0.0.1:8000/media/'

const axiosInstance = axios.create({
    baseURL : BackendUrl,
    timeout : 10000,
    headers :{
        'Content-Type' : 'application/json',
        accept : 'application/json',
        token : sessionStorage.getItem('token')?sessionStorage.getItem('token'):null
    }
})

export default axiosInstance
export {mediaUrl};
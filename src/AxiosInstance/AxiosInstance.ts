import axios from 'axios';
import { Environment } from '../utils/Enums&Constants';

const serverBaseURL = Environment.PRODUCTION ? 'https://image-upload-msc8.onrender.com/' : 'http://localhost:8080';
const axiosInstance = axios.create({
  baseURL: serverBaseURL,
});

export default axiosInstance;

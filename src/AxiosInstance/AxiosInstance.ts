import axios from 'axios';
import { Environment } from '../utils/Enums&Constants';

const serverBaseURL = Environment.DEVELOPMENT ? 'https://image-upload-msc8.onrender.com/' : 'https://something.com';
const axiosInstance = axios.create({
  baseURL: serverBaseURL,
});

export default axiosInstance;

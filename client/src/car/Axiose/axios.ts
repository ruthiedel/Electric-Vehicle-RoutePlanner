import axios from 'axios'
const url = "https://localhost:7216/api"

const axiosInstance = axios.create({ baseURL: url })

axiosInstance.interceptors.request.use(
)

axiosInstance.interceptors.response.use(
)

export default axiosInstance
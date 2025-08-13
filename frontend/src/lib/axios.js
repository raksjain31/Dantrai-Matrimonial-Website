import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8081/api/v1" : "https://api.abugoadyouthconnect.com/api/v1",
    withCredentials: true,
});
//"/api/v1"
export default axiosInstance
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const instance = axios.create({
    baseURL: "http://localhost:8080",
});

const apiClient = setupCache(instance);

export default apiClient;

import axios from "axios";


export const BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: BASE_URL,
});

const RESUME_BASE_URL = "http://localhost:3001";

export const resumeAPI = axios.create({
    baseURL: RESUME_BASE_URL,
});

const VALIDATION_BASE_URL = "http://localhost:8000";

export const validationAPI = axios.create({
    baseURL: VALIDATION_BASE_URL,
});

export default api;
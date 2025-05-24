
import axios from "axios";

const DATA_URL = "https://jsonplaceholder.typicode.com/posts";
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const axiosInstance = axios.create({
    baseURL: "",
    headers: { 'Content-Type': 'application/json' },

});

const axiosAPIInstance = axios.create({
    baseURL: "",
    headers: { 'Content-Type': 'application/json' },
});

const useAxios = () => {
    return axiosInstance;
}

const useAxiosApi = () => {
    return axiosAPIInstance;
}

export { useAxios, useAxiosApi };
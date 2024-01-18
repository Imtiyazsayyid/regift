import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8003/api/admin",
});

export default Api;

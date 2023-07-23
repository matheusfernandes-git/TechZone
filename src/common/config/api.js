import axios from "axios";

const instance = axios.create({
  baseURL: "https://tech-json.vercel.app",
});

export default instance;

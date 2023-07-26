import axios from "axios";

//utilizei o render para fazer o deploy da api fake json
const instance = axios.create({
  baseURL: "https://api-tech.onrender.com",
});

export default instance;

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "process.env.REACT_APP_API_URL";

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};


// THIS COMPONENT MIGHT BE USELESS

export default {
  getUserBoard,
};
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const login = async (body) =>
  await axios.post(`${BASE_URL}/Users/authenticate/`, body);

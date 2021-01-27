import axios from "axios";

export const postData = async (path, data) => {
  
  const Token = localStorage.getItem("Token");
  console.log("token", Token);
  const response = await axios.post(`${path}`, data, {
    headers: {
      Token,
    },
  });
  return response?.data;
};
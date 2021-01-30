import axios from "axios";

export const postData = async (path, data) => {
  
  const Token = localStorage.getItem("Token");
  console.log("token", Token);
  const response = await axios.post(path, data, {
    headers: {
      "Authorization": `Token ${Token}`,
    },
  });
  console.log(response.status)
  return response?.data;
};

export const postDataLike = async (path, data) => {
  
  const Token = localStorage.getItem("Token");
  
  const response = await axios.post(path,data, {
    headers: {
      "Authorization": `Token ${Token}`,
    },
  });
  
  return response;
};
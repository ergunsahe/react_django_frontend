import axios from "axios";


export const fetchData = async (path, data) => {
  
  
  const response = await axios.post(path, data)
 
  return response?.data;
};
export const fetchDataDetail = async (path, data) => {
  // const Token = localStorage.getItem("Token");
  
  const response = await axios.get(path, data)
  console.log(response)
 
  return response?.data;
};




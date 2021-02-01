import axios from "axios";
export const fetchData = async (data) => {
  
  const response = await axios.post("https://rd-restful-blog.herokuapp.com/auth/login/", data)
  
 
  return response?.data;
};
// export const fetchDataDetail = async (slug) => {
//    const Token= localStorage.getItem("Token")
//   if (Token){
//       const res = await axios.get(`https://rd-restful-blog.herokuapp.com/${slug}/detail`,{
//       headers: {
//         "Authorization": `Token ${Token}`,
//       }
//     })
//     return res?.data
//   }else{
//     const res = await axios.get(`https://rd-restful-blog.herokuapp.com/${slug}/detail`)
//     return res?.data
//   }

// }


// export const fetchDataList = async () => {
//   const res = await axios.get('https://rd-restful-blog.herokuapp.com/list/')
//   return res?.data
// }



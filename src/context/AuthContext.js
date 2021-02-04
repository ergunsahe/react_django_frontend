import { createContext, useState} from "react";
import axios from "axios"; 



export const AuthContext = createContext(null);


function AuthContextProvider(props) {
  const [postData, setPostData] = useState([]);
  const [isLogged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true)
  
  const [currentUser, setCurrentUser] = useState('');

  const fetchDataList = async () =>{
    
    try {
      const results = await axios.get('https://rd-restful-blog.herokuapp.com/list/');
      setPostData(results?.data);
      setLoading(false)
          
      
    
    } catch (error) {
      console.error(error);
    }
  }
  
  const fetchDataLogin = async (data) => {
    
    try {
      const response = await axios.post("https://rd-restful-blog.herokuapp.com/auth/login/", data)
      setLogged(true)
      setCurrentUser(response?.data.user.username)
      
      
      return response?.data;
    } catch (error) {
      console.log(error)
    }
  }
    
   
  
  return (
    <AuthContext.Provider value={{loading, isLogged, setLogged, postData, fetchDataList, currentUser, setCurrentUser, fetchDataLogin}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
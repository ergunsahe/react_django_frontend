import { createContext, useState, useEffect} from "react";
import axios from "axios"; 



export const AuthContext = createContext(null);


function AuthContextProvider(props) {
  const [postData, setPostData] = useState([]);
  const [isLogged, setLogged] = useState(false);
  const [loading, setLoading] = useState([])
  
  const [currentUser, setCurrentUser] = useState(null);

  const fetchDataList = async () =>{
    
    
    try {
      const results = await axios.get('https://rd-restful-blog.herokuapp.com/list/');
      setPostData(results?.data);
     
      
      return results?.data
    
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() =>{
    setLoading(false)
  },[postData])
  
  return (
    <AuthContext.Provider value={{ loading, setLoading, isLogged, setLogged, postData, fetchDataList, currentUser, setCurrentUser}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
import { createContext, useState,} from "react";
import axios from "axios"; 



export const AuthContext = createContext(null);


function AuthContextProvider(props) {
  const [postList, setPostList] = useState(false);
  const [isLogged, setLogged] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);

  
  return (
    <AuthContext.Provider value={{ postList, setPostList, isLogged, setLogged}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
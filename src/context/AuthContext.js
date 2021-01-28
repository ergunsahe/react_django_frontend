import { createContext, useState,} from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, setCurrentUser, currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
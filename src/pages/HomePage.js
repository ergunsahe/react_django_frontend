import React, {useState, useEffect} from "react"
import Container from "@material-ui/core/Container";
import CardList from "../components/CardList"


const HomePage = () => {
  
  
    
    
    return (
     
      <Container>
        <CardList/>
      </Container>
  );
};
export default HomePage;


// import { createContext, useState, useEffect } from "react";
// import firebase from "../firebase/firebase.utils";

// export const FirebaseAuthContext = createContext();

// function AuthContextProvider(props) {
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     firebase?.firebaseAuth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });
//   }, []);

//   return (
//     <FirebaseAuthContext.Provider value={{ currentUser }}>
//       {props.children}
//     </FirebaseAuthContext.Provider>
//   );
// }

// export default AuthContextProvider;
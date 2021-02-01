import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useContext, useEffect } from "react";
import  DetailPage from "../pages/DetailPage";
import  HomePage from "../pages/HomePage";
import SignUp from "../pages/Register" 
import SignIn from "../pages/LoginPage" 
import ProfilePage from "../pages/ProfilePage." 
import  Navbar from "../components/Navbar"
import PostPage from "../pages/PostPage"
import UpdatePost from "../pages/UpdatePage"
import { AuthContext } from "../context/AuthContext";



function AppRouter(params) {
    const {isLogged} = useContext(AuthContext)

    useEffect(() =>{
        localStorage.getItem("Token")
    }, [isLogged])
    
    
    return (
        <Router>
            <Navbar isLogged={isLogged}/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/:slug/detail" component={DetailPage} />
                {
                    !localStorage.getItem("Token")
                    
                    ?
                    <>
                        <Route exact path="/register" component={SignUp} />
                        <Route exact path="/login" component={SignIn} />
                    </>
                    :
                    <> 
                        
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/create" component={PostPage} />
                        <Route exact path="/:slug/update" component={UpdatePost} />
                    </>
                }
                
            </Switch>
        </Router>
    )    
}

export default AppRouter;
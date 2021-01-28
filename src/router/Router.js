import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useContext } from "react";
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
    const {currentUser, isLoggedIn} = useContext(AuthContext)
    
    
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                {
                    !localStorage.getItem("Token")
                    
                    ?
                    <>
                        <Route exact path="/register" component={SignUp} />
                        <Route exact path="/login" component={SignIn} />
                    </>
                    :
                    <> 
                        <Route exact path="/:slug/detail" component={localStorage.getItem("Token") ? DetailPage: SignIn} />
                        <Route exact path="/profile" component={localStorage.getItem("Token") ? ProfilePage: SignIn} />
                        <Route exact path="/create" component={localStorage.getItem("Token") ? PostPage: SignIn} />
                        <Route exact path="/update" component={localStorage.getItem("Token") ? UpdatePost:SignIn} />
                    </>
                }
                {/* <Route exact path="/forgot-password" component={ForgotPassword} /> */}
                {/* <Route
                    exact
                    path="/user/:id"
                    component={currentUser ? UserDetail : Signin}
                />
                <Route
                    exact
                    path="/user/:id/post"
                    component={currentUser ? UserPost : Signin}
                />
                <Route path="/" component={Main} /> */}
            </Switch>
        </Router>
    )    
}

export default AppRouter;
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import  DetailPage from "../pages/DetailPage";
import  HomePage from "../pages/HomePage";
import SignUp from "../pages/Register" 
import SignIn from "../pages/LoginPage" 
import  Navbar from "../components/Navbar"

function AppRouter(params) {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/detail" component={DetailPage} />
                <Route exact path="/register" component={SignUp} />
                <Route exact path="/login" component={SignIn} />
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
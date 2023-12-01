import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../containers/Home";
import Activate from "../containers/Activate"
import Login from "../containers/Login";
import ResetPassword from "../containers/ResetPassword";
import ResetPasswordConfirm from "../containers/ResetPasswordConfirm";
import SignUp from "../containers/SignUp";

import Layout from "../hocs/Layout";

export function RoutesApp() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/login" Component={Login}/>
                    <Route path="/signup" Component={SignUp}/>
                    <Route path="/activate/:uid/:token" Component={Activate}/>
                    <Route path="/reset_password" Component={ResetPassword}/>
                    <Route path="/password/reset/confirm/:uid/:token" Component={ResetPasswordConfirm}/>
                </Routes>
            </Layout>
        </Router>
    )
}
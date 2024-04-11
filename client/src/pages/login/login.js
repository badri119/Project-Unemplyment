import React from "react"; 
import "./login.css";

const Login = () => {
    return (
        <div class="login-container">
            <div class="login-form-container">
                <div class="login-element"><h3>Username</h3></div>
                <div class="login-element"><input type="text" name="username" class="login-form-input" /></div>
                <div class="login-element"><h3>Password</h3></div>
                <div class="login-element"><input type="password" name="password" class="login-form-input" /></div>
                <div class="login-element buttons"><input type="submit" class="get-started"/></div>
            </div>
            <h3>Don't have an account? <br/><a href="/register" class="link">Create an Account</a> instead!</h3>
        </div>
    );
};

export default Login;
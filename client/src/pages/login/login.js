import React , { useState } from "react"; 
import "./login.css";

const Login = () => {
    const [data, setData] = useState(null);
    function APILogin(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET','localhost:8080/Login')
        xhr.onload = function() {
            if (xhr.status === 200) {
                setData(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }
    return (
        <div class="login-container">
            <div class="login-form-container">
            <form>
                <div class="login-element"><h3>Username</h3></div>
                <div class="login-element"><input type="text" name="username" class="login-form-input" /></div>
                <div class="login-element"><h3>Password</h3></div>
                <div class="login-element"><input type="password" name="password" class="login-form-input" /></div>
                <div class="login-element buttons"><input type="submit" class="get-started"/></div>
            </form>
            </div>
            <h3>Don't have an account? <br/><a href="/register" class="link">Create an Account</a> instead!</h3>
        </div>
    );
};

export default Login;
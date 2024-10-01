import React, {useState} from "react"
import "./LoginStyle.css";
//import AuthCheck from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
//let {login} = AuthCheck();
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

const handleLogin = async (e) => {
e.preventDefault();
console.log(formData, "form")
let {email, password} = formData;
console.log(email, "emai", password);
authHandler(email, password)
//await login(email, pass)
//navigate('/dashboard');
}

async function  authHandler(email, password){
   console.log(email, password, "auth");
try {
      const response = await fetch('https://dummyjson.com/auth/login', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      const data = await response.json();
      console.log(data, "data");
    } catch (error) {
      console.error("Login failed:", error);
    }
}
const handleInputChange= (e) => {
let {name, value} = e.target;
setFormData({
...formData,
[name]: value
})
console.log(formData, "sss")
}
return (
<div className="login-container">
        <div className="login-left">
        </div>
        <div className="login-right">
            <h2>Get started!</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-container">
                    <label htmlFor="username">User name</label>
                    <input type="text" id="username"
                     value={formData.email}
                     name="email"
                    onChange={handleInputChange} placeholder="Enter your email" />
                    <i className="icon-user"></i>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                    name="password"
                      value={formData.password}
                    onChange={handleInputChange} placeholder="Enter your password" />
                    <i className="icon-lock"></i>
                </div>
                <div className="login-options">
                    <label><input type="checkbox" /> Remember me</label>
                    <a href="#" className="forgot-password">Forgot your password?</a>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    </div>
    )
}

export default LoginPage;
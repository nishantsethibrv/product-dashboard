import React, {useState} from "react"
import "./LoginStyle.css";
import AuthCheck from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
let {login} = AuthCheck();
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed!');
      // Perform the action here (e.g., submitting the form or triggering a function)
      handleLogin(e);
    }
  };

    const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(formData, "form")
    let {email, password} = formData;

    if (!email) {
        setEmailError('Please enter your email address.');
      } else {
        setEmailError('');
      }
  
      if (!password) {
        setPasswordError('Please enter your password.');
      } else if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
      } else {
        setPasswordError('');
      }
  
      if (!emailError && !passwordError)   
   {
        // authHandler(email, password)
            await login(email, password)
            navigate('/dashboard');
      }
    // console.log(email, "emai", password);
    
    }

// async function  authHandler(email, password){
//    console.log(email, password, "auth");
// try {
//       const response = await fetch('https://dummyjson.com/auth/login', { // Replace with your API endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username: email, password: password }),
//       });

//       const data = await response.json();
//       console.log(data, "data");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
// }
    const handleInputChange= (e) => {
    let {name, value} = e.target;
    setFormData({
    ...formData,
    [name]: value
    })
    // console.log(formData, "sss")
    }
return (
<div className="login-container">
        <div className="login-left">
        </div>
        <div className="login-right">
            <h2>Product Dashboard</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-container">
                    <label htmlFor="username">User name</label>
                    <input type="text" id="username"
                     value={formData.email}
                     name="email"
                    onChange={handleInputChange} placeholder="Enter your email" />
                    <i className="icon-user"></i>
                </div>
                {emailError && <p>{emailError}</p>}
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                    name="password"
                      value={formData.password}
                    onChange={handleInputChange} placeholder="Enter your password"
                     onKeyPress={handleKeyPress}
                    />
                    <i className="icon-lock"></i>
                </div>
                {passwordError && <p>{passwordError}</p>}
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
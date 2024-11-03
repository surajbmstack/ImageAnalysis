import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importing the CSS file
import { useNavigate } from 'react-router-dom';
const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                 navigate('/upload')
                alert('Welcome!');
                
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="input-field"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="submit-button">Login</button>
        </form>
    );
};

export default Login;

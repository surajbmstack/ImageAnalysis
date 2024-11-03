import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ImageUpload from './components/ImageUpload';
import History from './components/History';
import Home from './components/Home';
import Navbar from './components/Navbar'; 
import './App.css';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <div className="app">
                <Navbar token={token} setToken={setToken} /> {/* Navbar at the top */}
                <h1>Image Analysis App</h1>

                <Routes>
                   <Route path="/register" element={<Register />} />
                   <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={token ? <ImageUpload token={token} /> : <Login setToken={setToken} />} />
                    <Route path="/history" element={token ? <History /> : <Login setToken={setToken} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

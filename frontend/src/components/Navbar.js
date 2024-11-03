// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: For styling

const Navbar = ({ token, setToken }) => {
    return (
        <nav className="navbar">
            <ul>
                {token ? (
                    <>
                        <li>
                            <Link to="/upload">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/history">History</Link>
                        </li>
                        <li>
                            <button onClick={() => setToken(null)}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/register">Register</Link>
                        </li>
                        <li>
                        <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

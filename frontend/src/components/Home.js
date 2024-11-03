import React from 'react';
import './Home.css'; // Importing the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <h2 className="home-title">Welcome to the Image Recognition App</h2>
            <p className="home-description">Upload an image URL to analyze its contents using AI.</p>
        </div>
    );
};

export default Home;

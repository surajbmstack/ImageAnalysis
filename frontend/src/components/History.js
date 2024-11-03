import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css'; // Importing the CSS file

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/images/history', {
                    headers: { Authorization: localStorage.getItem("token") },
                });
                setHistory(response.data);
            } catch (error) {
                console.error('Fetching history failed:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="history-container">
            <h2>Analysis History</h2>
            <ul className="history-list">
                {history.map((item, index) => (
                    <li key={index} className="history-item">
                        <img 
                            src={item.imageUrl} 
                            alt={`Image uploaded on ${new Date(item.createdAt).toLocaleString()}`} 
                            className="history-image"
                        />
                        <p className="concepts-title">Contents:</p>
                        <ul className="concepts-list">
                            {item.concepts.map((concept, conceptIndex) => (
                                <li key={conceptIndex} className="concept-item">
                                    {concept.name}: {concept.value.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <p className="upload-date">Uploaded on: {new Date(item.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;

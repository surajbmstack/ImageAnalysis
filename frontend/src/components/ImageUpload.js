import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css'; // Importing the CSS file

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/images/analyze', { imageUrl }, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setResults(response.data.results);
        } catch (err) {
            setError('Error analyzing image: ' + err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-upload-container">
            <h1>Image Upload and Analysis</h1>
            <form className="image-upload-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze Image'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {imageUrl && (
                <div className="image-preview">
                    <h2>Uploaded Image:</h2>
                    <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
                </div>
            )}

            {results && (
                <div className="analysis-results">
                    <h2>Analysis Results:</h2>
                    <ul>
                        {results.map((concept, index) => (
                            <li key={index}>
                                {concept.name}: {concept.value.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

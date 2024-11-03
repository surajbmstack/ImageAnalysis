const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cors=require('cors')
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    // For legacy browser support
};

// Use CORS with options
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongodb connected")
    })
    .catch(err => console.error(err));
    
app.listen(PORT,()=>console.log(`server running on ${PORT}`))
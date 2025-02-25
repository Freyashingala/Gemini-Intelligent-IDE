const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ideRoutes = require('./routes/ideRoutes');
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// CORS Setup
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json());
app.use(express.static('public'));

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
app.set('genAI', genAI); // Store in app locals for global access

app.use("/auth", authRoutes);
app.use("/ide", ideRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // db.js 가져오기
const { authenticateToken } = require('./jwt'); // jwt.js 가져오기
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

connectDB(); // MongoDB 연결

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const chatRoutes = require('./routes/chats');
const marketRoutes = require('./routes/market');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/market', marketRoutes);

// 잘못된 경로 처리
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

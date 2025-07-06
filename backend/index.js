const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ✅ Security middleware
app.use(helmet());

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { msg: 'Too many requests, please try again later.' }
});
app.use(limiter);

// ✅ CORS middleware to remove CORS block
const allowedOrigins = [
  'https://tpms-nitjsr.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));         // Apply CORS to all routes
app.options('*', cors(corsOptions)); // Handle preflight requests

// ✅ Body parser
app.use(express.json());

// ✅ Static folders
app.use('/profileImgs', express.static(path.join(__dirname, 'public/profileImgs')));
app.use('/resume', express.static(path.join(__dirname, 'public/resumes')));
app.use('/offerLetter', express.static(path.join(__dirname, 'public/offerLetter')));

// ✅ Connect to MongoDB
const mongodb = require('./config/MongoDB');
mongodb();

// ✅ API Routes
app.use('/user', require('./routes/user.route'));
app.use('/student', require('./routes/student.route'));
app.use('/tpo', require('./routes/tpo.route'));           // <== This includes /tpo/login
app.use('/management', require('./routes/management.route'));
app.use('/admin', require('./routes/superuser.route'));
app.use('/company', require('./routes/company.route'));

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

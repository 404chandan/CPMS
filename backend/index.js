const express = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://cpms-self.vercel.app',   // ✅ Your Vercel frontend
  'http://localhost:3000'           // ✅ For local development (optional)
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// ✅ Public folders
app.use('/profileImgs', express.static(path.join(__dirname, 'public/profileImgs')));
app.use('/resume', express.static(path.join(__dirname, 'public/resumes')));
app.use('/offerLetter', express.static(path.join(__dirname, 'public/offerLetter')));

// ✅ MongoDB connection
const mongodb = require('./config/MongoDB');
mongodb();

// ✅ Routes
app.use('/user', require('./routes/user.route'));
app.use('/student', require('./routes/student.route'));
app.use('/tpo', require('./routes/tpo.route'));
app.use('/management', require('./routes/management.route'));
app.use('/admin', require('./routes/superuser.route'));
app.use('/company', require('./routes/company.route'));

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

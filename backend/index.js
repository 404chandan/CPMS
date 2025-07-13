/*─────────────────────────────────────────────────────────────*
 *  server.js  –  Express API entry point
 *─────────────────────────────────────────────────────────────*/

require('dotenv').config();           // Load .env before anything else
const express     = require('express');
const cors        = require('cors');
const path        = require('path');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');

const app = express();

/*─────────────────────────────────────────────────────────────*
 * Security headers (Helmet)
 *─────────────────────────────────────────────────────────────*/
app.use(helmet());

/*─────────────────────────────────────────────────────────────*
 * Rate‑limiter  – 100 requests / 15 min per IP
 *─────────────────────────────────────────────────────────────*/
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { msg: 'Too many requests, please try again later.' },
  }),
);

/*─────────────────────────────────────────────────────────────*
 * CORS – allow your front‑end origins + cookies/JWT
 *─────────────────────────────────────────────────────────────*/
const allowedOrigins = [
  'https://tpms-nitjsr.vercel.app', // Production front‑end
  'http://localhost:3000',          // Local dev front‑end
];

app.use(
  cors({
    origin(origin, cb) {
      // curl/Postman or same‑origin requests have no Origin header
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,        // ← allow cookies / Authorization header
    optionsSuccessStatus: 200 // For legacy browsers
  }),
);

// Respond rapidly to CORS pre‑flight
app.options('*', cors());

/*─────────────────────────────────────────────────────────────*
 * JSON body parser
 *─────────────────────────────────────────────────────────────*/
app.use(express.json());

/*─────────────────────────────────────────────────────────────*
 * Static file serving
 *─────────────────────────────────────────────────────────────*/
app.use('/profileImgs', express.static(path.join(__dirname, 'public/profileImgs')));
app.use('/resume',      express.static(path.join(__dirname, 'public/resumes')));
app.use('/offerLetter', express.static(path.join(__dirname, 'public/offerLetter')));

/*─────────────────────────────────────────────────────────────*
 * MongoDB connection
 *─────────────────────────────────────────────────────────────*/
const connectMongo = require('./config/MongoDB');
connectMongo()
  .then(() => console.log('✅  MongoDB connected'))
  .catch((err) => {
    console.error('❌  MongoDB connection failed:', err);
    process.exit(1);
  });

/*─────────────────────────────────────────────────────────────*
 * API routes
 *─────────────────────────────────────────────────────────────*/
app.use('/user',       require('./routes/user.route'));
app.use('/student',    require('./routes/student.route'));
app.use('/tpo',        require('./routes/tpo.route'));
app.use('/management', require('./routes/management.route'));
app.use('/admin',      require('./routes/superuser.route'));
app.use('/company',    require('./routes/company.route'));

/*─────────────────────────────────────────────────────────────*
 * 404 handler
 *─────────────────────────────────────────────────────────────*/
app.use((_, res) => res.status(404).json({ msg: 'Route not found' }));

/*─────────────────────────────────────────────────────────────*
 * Start server
 *─────────────────────────────────────────────────────────────*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀  Server running at http://localhost:${PORT}`)
);

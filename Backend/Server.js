const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', require('./Routes/Student'));
app.use('/api/contests', require('./Routes/Contest'));
app.use('/api/problems', require('./Routes/ProblemStat'));
app.use('/api/cron-config', require('./Routes/CronConfig'));
app.use('/api/dashboard', require('./Routes/dashboard'));
app.use('/api/export', require('./Routes/Export'));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    require('./Utils/CronScheduler');
    console.log(' Cron scheduler initialized');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection failed:', err));

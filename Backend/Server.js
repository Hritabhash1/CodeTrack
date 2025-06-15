const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./Utils/CronScheduler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./Routes/Student');
app.use('/api/students', studentRoutes);
const contestRoutes = require('./Routes/Contest');
app.use('/api/contests', contestRoutes);
const problemStatRoutes = require('./Routes/ProblemStat');
app.use('/api/problems', problemStatRoutes);
const cronConfigRoutes = require('./Routes/CronConfig');
app.use('/api/cron-config', cronConfigRoutes);

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection failed:', err));

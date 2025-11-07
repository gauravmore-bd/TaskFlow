const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const adminRoutes = require("./routes/admin")

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/admin',adminRoutes);
app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

module.exports = app;

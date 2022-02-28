const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/users');
const ticketRoutes = require('./routes/tickets');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the support desk api" });
});

// Routes

app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT} 😎`));
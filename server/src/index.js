const express = require('express');
const dotenv = require('dotenv').config();
const dbConnection = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Server
const PORT = process.env.PORT || 5000;
dbConnection().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.error(error.message);
    process.exit(1);
});
const express = require('express');
const dotenv = require('dotenv').config();
const dbConnection = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const fileRouter = require('./routes/fileRoutes');
const profileRouter = require('./routes/profileRoutes');
const teamRouter = require('./routes/teamRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://crm-78zr.onrender.com', 'http://localhost:5173'],
    credentials: true
}))

app.get('/api', (req, res) => {
    res.send('API is running');
});

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/file', fileRouter);
app.use('/profile', profileRouter);
app.use('/team', teamRouter);

// Server
const PORT = process.env.PORT || 5000;
dbConnection().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.error(error.message);
    process.exit(1);
});
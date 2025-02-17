const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-auth');
        console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = dbConnection;
const mongoose = require('mongoose')
const mongoUri = 'mongodb://localhost:27017/inotebook'
const connectToMongo = () => {
    mongoose.connect(mongoUri);

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB successfully');
    });
};

module.exports = connectToMongo;
const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/i_notebook"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

module.exports = connectToMongo;
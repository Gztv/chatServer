const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Mongoose DB running');
    } catch (error) {
        console.error(error);
        throw new Error('Something is wrong, Contact with Admin');
    }
}
module.exports = {
    dbConnection
}
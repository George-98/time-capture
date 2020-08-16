const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'time-capture';

const load = (req, res) => {
    dbConnection();
    const isTimerRunning = false;
    const timerButtonText = isTimerRunning ? 'stop' : 'start';
    const options = ['Build a teleportar', 'Build amazon website']
    return res.render('index', {
        title: 'Time Capture',
        timerButtonText,
        options
    });
}

const dbConnection = () => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error){
            console.log(error);
            return console.log('Unable to connect to database');
        }

        const db = client.db(databaseName);
    });
}

module.exports = {load};
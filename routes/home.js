const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'time-capture';

const load = (req, res, cb) => {
    if(Object.keys(req.body).length !== 0){
        return dbConnection(req.body, getCurrentTime(), cb);
    }
    return renderPage(res);
}

const renderPage = (res) => {
    const isTimerRunning = false;
    const timerButtonText = isTimerRunning ? 'stop' : 'start';
    const options = ['Build a teleportar', 'Build amazon website']
    return res.render('index', {
        title: 'Time Capture',
        timerButtonText,
        options
    });
}

const getCurrentTime = () => {
    return new Date();
}

const dbConnection = ({user}, startDateTime, cb) => {
    return MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error){
            console.log(error);
            return cb({error: true, message: 'Unable to connect to database!'});
        }

        const db = client.db(databaseName);
        return db.collection('times').insertOne({ user, startDateTime, timerActive: true})
        .then(() => {
            cb({error: false, message: 'Document saved!'});
        })
        .catch(e => {
            cb({error: true, message: 'Unable to save document!'});
        });
    });
}

module.exports = {load};
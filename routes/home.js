const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'time-capture';

const load = (req, res, cb) => {
    if(Object.keys(req.body).length !== 0){
        return dbConnection(req.body, getCurrentTime(), cb);
    }
    return renderPage(cb);
}

const renderPage = (cb) => {
    const isTimerRunning = false;
    const timerButtonText = isTimerRunning ? 'Stop' : 'Start';
    const options = ['Build a teleportar', 'Build amazon website'];
    return cb({title: 'Time Capture', timerButtonText, options});
}

const getCurrentTime = () => {
    return new Date();
}

const dbConnection = (data, startDateTime, cb) => {
    return MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error){
            console.log(error);
            return cb({error: true, message: 'Unable to connect to database!'});
        }

        const db = client.db(databaseName);

        if(data.timerButtonText === 'Start'){
            return setStartTime(db, data, startDateTime, cb);
        }
        else {
            retrieveTime(db, data, cb);
        }
    });
}

const retrieveTime = (db, {user}, cb) => {
    return db.collection('times').findOne({timerActive: true}, (e, result) => {
        return db.collection('times').updateOne(result, {$set :{timerActive : false, endDateTime: getCurrentTime()}})
            .then(() => {
                return cb({error: false, message: 'Document updated!', buttonText: 'Start'});
            })
            .catch(e => {
                return cb({error: true, message: `Unable to save document! ${e}`});
            });
    });
}

const setStartTime = (db, {user}, startDateTime, cb) => {
    const newDocument = { user, startDateTime, timerActive: true}
    return addData(db, 'times', newDocument, cb);
}

const addData = (db, collection, newDocument, cb) => {
    return db.collection(collection).insertOne(newDocument)
        .then(() => {
            return cb({error: false, message: 'Document saved!', buttonText: 'Stop'});
        })
        .catch(e => {
            return cb({error: true, message: `Unable to save document! ${e}`});
        });
}

module.exports = {load};
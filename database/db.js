const {MongoMemoryServer} = require('mongodb-memory-server');
const MongoClient = require("mongodb").MongoClient

require('dotenv').config();

let database = null;

async function startDatabase(){
    const mongo = new MongoMemoryServer();
    const MongoDB_URL = process.env.MONGO_DB_CONNECTION_STRING;
    const connection = await MongoClient.connect(MongoDB_URL, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase(){
    if (!database){
        await startDatabase();
    }
    return database;
}

function getCollection(database, collection){
   MongoClient.connect(`mongodb+srv://${process.env.MONGO}:${process.env.PASSWORD}@${process.env.DATABASE}.zo4eh.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, function(err, client){
        if (err) throw err;
        
        let db = client.db(database)

        db.collection(collection).find().toArray(function(err, result){
            if (err) throw err;
            //console.log(result)
            console.log("Success")
        })
    })
    
/*
    console.log(`mongodb+srv://${process.env.MONGO}:${process.env.PASSWORD}@${process.env.DATABASE}.zo4eh.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
    */
}
module.exports = {
    getDatabase,
    startDatabase,
    getCollection,
};
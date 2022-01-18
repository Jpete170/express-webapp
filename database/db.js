const {MongoClient} = require("mongodb")
let DB = process.env.MONGO;
const client = new MongoClient(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let _db; //instantiate database variable before exporting it.

module.exports = {
    serverConnection: function(callback){ // Use for initial database connection when app is started / connected
        client.connect(function(err, db){
            if(db){
                _db = db.db("sample_airbnb")
                console.log("successful connection to MongoDB Database")
            }
            return callback(err);
        })
    },
    getDB: function(database){
        client.connect(function(err, db){
            if(db){
                _db = db.db(database)
                console.log(`successful connection to ${database}`)
            }
        })
        return _db;
    },
};

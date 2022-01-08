const MongoClient = require("mongodb").MongoClient
let DB = process.env.MONGO;
const client = new MongoClient(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let _db; //instantiate database variable before exporting it.

module.exports = {
    serverConnection: function(callback){
        client.connect(function(err, database){
            if(database){
                _db = database.client("sample_airbnb")
                console.log("successful connection")
            }
            return callback(err);
        })
    },
    getDB: function(){
        return _db;
    },
};

const MongoClient = require("mongodb").MongoClient

function getCollection(database, collection){
   // let results = []; 
    MongoClient.connect(`${process.env.MONGO}`, function(err, client){
        if (err) throw err;

        let db = client.db(database);

        let results = db.collection(collection).find({
            name: "Ribeira Charming Duplex",
        }).toArray(function(err, result){
            if (err) throw err;
            
        })
    })   
    //return results;
}

module.exports = {
    getCollection,
};

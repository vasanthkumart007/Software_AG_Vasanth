const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.log("-----------------INDEX PAGE ACTIVATED-----------------")
    res.sendFile(__dirname+'/'+"index.html");
})


app.post('/processpost', function(req, res) {
    var obj = req.body;
    console.log(obj);
    var url = "mongodb://admin:password@mongodb:27017"

    MongoClient.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true}, function(err,dbs) {
        if (err) throw err;

        var db = dbs.db("mydb");

        db.collection("users").insertOne(obj, function(err,resp){
            if (err) throw err;

            console.log("-----------------ADDED SUCCESSFULLY-----------------");
            res.send("-----------------ADDED SUCCESSFULLY-----------------")
        
        });

    });
});

app.listen(3000, function() {
    console.log('YOUR BOOKING APP LISTENING @ http://localhost:3000')
  })
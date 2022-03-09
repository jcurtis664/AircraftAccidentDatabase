const express = require('express');
const {MongoClient, AutoEncryptionLoggerLevel} = require('mongodb');
const mongoose = require('mongoose');

var app = express();
var server = app.listen(3000);

app.use(express.static('./AircraftAccidentDatabase/frontend'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
console.log('running');

var accident_model = null;

const accident_schema = new mongoose.Schema({
    tags: [String],
    date: {
        year: String,
        month: String,
        day: String
    },
    location: String,
    aircraft: String,
    airline: String,
    fatalities: String,
    ICAO_categories: [String],
    AI_link: String,
    AVSN_link: String,
    synopsis: String,
    languange_references: [{page_number: String, reference: String}]
})

async function connectToDatabase()
{
    const uri = "mongodb+srv://admin:admin@aircraft-accidents.gmv7k.mongodb.net/aircraft_accidents_db?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try 
    {
        await client.connect();
        await mongoose.connect(uri);

        accident_model = mongoose.model("Accident", accident_schema, "aircraft_accidents");

        await listDatabases(client);
    }
    catch (e)
    {
        console.error(e);
    }

    finally
    {
        await client.close();
    }
}

async function listDatabases(client)
{
    databaseList = await client.db().admin().listDatabases();

    console.log("databases: ");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));
}

connectToDatabase().catch(console.error);

app.post('/makeAccident', function(req, res){
    console.log(req.body);
    res.end();
})
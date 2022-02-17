const express = require('express')
const prompt = require('prompt-sync')();
const {MongoClient, AutoEncryptionLoggerLevel} = require('mongodb');
const mongoose = require('mongoose');
console.log('hi')
var app = express()
var server = app.listen(3000)

app.use(express.static('./public'))

console.log('running')

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

async function main()
{
    const uri = "mongodb+srv://admin:admin@aircraft-accidents.gmv7k.mongodb.net/aircraft_accidents_db?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try 
    {
        await client.connect();

        await mongoose.connect(uri)

        await listDatabases(client);

        //await addNewAccident(client, createNewAccident());

        const test = mongoose.model("test", accident_schema, "aircraft_accidents");

        const accident_test = new test({
            tags: ["2012", "pie", "dog"],
            date: {year: "2012", month: "april", day: "28"},
            location: "here",
            aircraft: "grown man goose",
            airline: "illegal",
            fatalities: "36",
            ICAO_categories: ["Anex 10"],
            AI_link: "insert link here",
            AVSN_link: "insert like here",
            synopsis: "x = y",
            languange_references: [{page_number: "103", reference: "germanic"}]
        })

        accident_test.save(function (err, book) {
            if (err) return console.error(err);
            console.log(book.name + " saved.");
          });
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

main().catch(console.error);
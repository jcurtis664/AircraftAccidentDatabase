const { MongoClient, AutoEncryptionLoggerLevel } = require('mongodb');
const mongoose = require('mongoose');
const http = require('http');
const fs = require('fs');

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
    languange_references: [{ page_number: String, reference: String }]
})

async function connectToDatabase() {
    const uri = "mongodb+srv://admin:admin@aircraft-accidents.gmv7k.mongodb.net/aircraft_accidents_db?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await mongoose.connect(uri);

        accident_model = mongoose.model("Accident", accident_schema, "aircraft_accidents");

        await listDatabases(client);
    }
    catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
}

async function listDatabases(client) {
    databaseList = await client.db().admin().listDatabases();

    console.log("databases: ");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));
}

connectToDatabase().catch(console.error);

let server = http.createServer(async (req, res) => {
    console.log(req.url);
    if (req.url == '/') {
        res.write(fs.readFileSync('./frontend/index.html'));
    }
    else if (req.url == '/style.css') {
        res.write(fs.readFileSync('./frontend/style.css'));
    }
    else if (req.url == '/tabs.js') {
        res.write(fs.readFileSync('./frontend/tabs.js'));
    }
    else if (req.url == '/reference.js') {
        res.write(fs.readFileSync('./frontend/reference.js'));
    }
    else if (req.url == '/submitButton.js') {
        res.write(fs.readFileSync('./frontend/submitButton.js'));
    }
    else if (req.url == '/template.html') {
        res.write(fs.readFileSync('./frontend/template.html'));
    }
    else if (req.url == '/defaultList.js') {
        res.write(fs.readFileSync('./frontend/defaultList.js'));
    }
    else if (req.url == '/top20') {
        let accident = await accident_model.find({});

        accident.sort((ele1, ele2) => {
            let date1 = Date.parse(ele1.date.year + ' ' + ele1.date.month + ' ' + ele1.date.day);
            let date2 = Date.parse(ele2.date.year + ' ' + ele2.date.month + ' ' + ele2.date.day);
            return date1 > date2
        });

        let top20 = [];
        for (let i = 0; i < 20; i++) {
            top20.push(accident[i]);
        }

        res.write(JSON.stringify(top20));
    }

    else if (req.url == '/makeAccident') {
        try {
            const buffers = [];

            for await (const chunk of req) {
                buffers.push(chunk);
            }

            let buffer = Buffer.concat(buffers).toString()
            const data = await JSON.parse(buffer);

            let model = data.ans;
            let file = new Int8Array(Object.values(data.file));

            let link = './accidentReports/' + model.accident_location + '-' + model.accident_date.year + '-' + model.accident_date.month + '-' + model.accident_date.day + '.pdf';
            fs.writeFileSync(link, file)

            const new_accident = new accident_model({
                tags: model.accident_tags,
                date: model.accident_date,
                location: model.accident_location,
                aircraft: model.accident_aircraft,
                airline: model.accident_airline,
                fatalities: model.accident_fatalities,
                ICAO_categories: model.accident_icao_categories,
                AI_link: link,
                AVSN_link: model.accident_avsn_link,
                synopsis: model.accident_synopsis,
                languange_references: model.references
            });

            console.log(new_accident);

            new_accident.save(function (err, accident) {
                if (err) {
                    return console.error(err);
                }
                console.log(accident._id + " saved.");
                res.write(JSON.stringify({ msg: "success" }));
                res.end();
            });
        }
        catch (err) {
            res.write("failed");
            res.end();
        }
    }

    else if (req.url == '/fillOutTemplate.js') {
        res.write(fs.readFileSync('./frontend/fillOutTemplate.js'));
    }

    else if (req.url.slice(0, 8) == '/report_') {
        res.write(fs.readFileSync('./frontend/template.html'));
    }

    else if (req.url.slice(0, 10) == '/accident_') {
        let id = req.url.slice(10, req.url.length);
        let data = await accident_model.findById(id).exec();

        res.write(JSON.stringify(data));
    }

    //end the response if the url is not make accident
    if (req.url != '/makeAccident') {
        res.end();
    }
});

server.listen(3000);
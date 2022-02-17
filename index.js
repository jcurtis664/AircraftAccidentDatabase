//native modules
const fs = require('fs');
//npm modules
const express = require('express');

async function start() {
    let app = express();
    let server = app.listen(3000);
    app.use(express.static('./public'));
}

start();
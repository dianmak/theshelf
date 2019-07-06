// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");

//cors package needs ot be install to support https API calls (npm install cors)
const cors = require("cors");
const https = require("https");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// require("./controllers/shelfController")(app);

// CORS enable to use API - need to install cors package- npm install cors
app.use(cors());

app.get('/lookup/:upc', function (request, res) {
    var opts = {
        hostname: 'api.upcitemdb.com',
        path: '/prod/trial/lookup',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    }

    var req = https.request(opts, function (resp) {
        resp.on('data', function (UPCoutput) {
            var UPCparsed = JSON.parse(UPCoutput);
            res.json(UPCparsed);
        })
    })

    req.on('error', function (e) {
        res.send('problem with request: ' + e.message);
    });
    console.log(request.params);
    const userUPC = request.params.upc;
    const UPC = { upc: userUPC }
    JSON.stringify(UPC)
    req.write(JSON.stringify(UPC))
    req.end()
})

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

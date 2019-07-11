// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // POST route for saving a new item
    app.post("/api/items", function (req, res) {
        console.log(req.body);
        db.Item.create({
            item_name: req.body.item_name,
            item_UPC: req.body.item_UPC,
            shelf_life: req.body.shelf_life,
            category: req.body.category,
            price: req.body.price,
            imageURL: req.body.imageURL,
            status: req.body.status,
            label: req.body.label
        })
            .then(function (dbItem) {
                res.json(dbItem);
            });
    });



};

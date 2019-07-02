const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const models = require("../models");

// Create all our routes and set up logic within those routes where required.

//get all active items for display on home page
router.get("/activeitems", function (req, res) {
    models.Item.findAll({ where: { status: "In Use" } }).then(function (data) {
        var hbsObject = {
            items: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

//get ALL items for display on myshelf
router.get("/myshelf", function (req, res) {
    models.Item.findAll({}).then(function (data) {
        res.json(data);
    });
});

// add an item
router.post("/api/myshelf/additem", function (req, res) {
    Item.create(req.body).then(function (result) {
        res.json({ id: result.item_name });
    });
});

// change something about an item
router.put("/api/myshelf/updateitem", function (req, res) {
    models.Item.update(

    ).then(function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});

// retire an item after ending use
router.delete("/api/myshelf/retireitem", function (req, res) {
    // Change item status from In Use to History
    models.Item.update(
        { Status: "History" },
        {
            where: { id: req.body.id }
        }).then(function (result) {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        });
    // Increase number of previously used items by 1
    models.Item.increment("previously_used", { where: { id: req.body.id } }).then(function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    })
});

// create new user profile
router.put("/api/user", function (req, res) {
    models.User.create(req.body).then(function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});

// delete user profile
router.delete("/api/user/:email", function (req, res) {
    models.User.destroy({ where: { email: req.params.email } }).then(function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});

// Export routes for server.js to use.
module.exports = router;

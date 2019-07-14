const express = require("express");
const path = require("path");
const router = express.Router();
const models = require("../models");

//get items by category
router.get("/api/items/category/:category", function (req, res) {
    models.Item.findAll({ where: { category: req.params.category } }).then(function (data) {
        res.json(data);
    });
});

//get items by status
router.get("/api/items/status/:status", function (req, res) {
    models.Item.findAll({ where: { status: req.params.status } }).then(function (data) {
        res.json(data);
    });
});

//get most recently added items that are in use to display on home page
router.get("/api/items/home", function (req, res) {
    models.Item.findAll({
        limit: 4,
        where: {
            status: "In Use"
        },
        order: [['id', 'DESC']]
    }).then(function (data) {
        console.log("here");
        res.json(data);
    });
});

//get ALL items for display on myshelf
router.get("/api/myshelf", function (req, res) {
    models.Item.findAll({}).then(function (data) {
        res.json(data);
    });
});

//get items in use which are expiring next
router.get("/api/items/expiring", function (req, res) {
    models.Item.findAll({
        limit: 4,
        where: {
            status: "In Use"
        },
        order: [['expiry_date', 'ASC']]
    }).then(function (data) {
        res.json(data);
    });
});

//get ONE item by id
router.get("/api/items/id/:id", function (req, res) {
    models.Item.findByPk(req.params.id).then(function (data) {
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
router.put("/api/myshelf/edititem", function (req, res) {
    console.log(req.body);
    models.Item.update({
        item_name: req.body.item_name,
        imageURL: req.body.imageURL,
        shelf_life: req.body.shelf_life,
        status: req.body.status,
        category: req.body.category,
        label: req.body.label,
        price: req.body.price
    }, {
            where: {
                id: req.body.id
            }
        }).then(function (result) {
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
        { status: "History" },
        {
            where: { id: req.body.id }
        }).then(function (result) {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            console.log("HEREEEE");
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
router.put("/api/user/create", function (req, res) {
    models.User.create(req.body).then(function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});


// delete user profile
router.delete("/api/user/delete/:email", function (req, res) {
    models.User.destroy({ where: { email: req.params.email } }).then(function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();

    });
});

// in use products for chart on home page
router.get("/api/home/chart", function (req, res) {
    models.Item.findAll({ where: { status: "In Use" }, attributes: ["category", "price"] }).then(function (result) {
        res.json(result);
    });
});

// recently added products for table on wallet page
router.get("/api/wallet/table/:category", function (req, res) {
    models.Item.findAll({
        limit: 5,
        where: { category: req.params.category },
        order: [["createdAt", "DESC"]]
    }).then(function (result) {
        res.json(result);
    })
});

// add new item
router.post("/api/items", function (req, res) {
    console.log(req.body);
    models.Item.create({
        item_name: req.body.item_name,
        item_UPC: req.body.item_UPC,
        shelf_life: req.body.shelf_life,
        category: req.body.category,
        price: req.body.price,
        imageURL: req.body.imageURL,
        status: req.body.status,
        label: req.body.label,
        tax: req.body.tax,
        expiry_date: req.body.expiry_date
    })
        .then(function (modelsItem) {
            res.json(modelsItem);
        });
});

// HTML routes
// Each of the below routes just handles the HTML page that the user gets sent to.

router.get("/", function (req, res) {
    req.session.userID = 10;
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/wallet", function (req, res) {
    console.log(req.session.userID);
    res.sendFile(path.join(__dirname, "../views/wallet.html"));
});

router.get("/shelf", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/shelf.html"));
});

// Export routes for server.js to use.
module.exports = router;

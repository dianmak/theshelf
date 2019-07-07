// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");

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
//require("./routes/html-routes.js")(app);
//require("./routes/author-api-routes.js")(app);
const router = require("./controllers/shelfController");
app.use(router);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

    db.User.create({ email: "shelf@trilogy.com", name: "Kelly" });
    //Makeup Items
    // 1
    db.Item.create({
        item_name: "Urban Decay 24/7 Glide On Waterproof Eye Pencil - Smoke",
        item_UPC: 604214460706,
        shelf_life: 6,
        status: "In Use",
        expiry_date: "2019-12-12",
        category: "Makeup",
        price: 20.00,
        previously_used: 5,
        imageURL: "http://s.cdnsbn.com/images/products/20885870902.jpg",
        UserId: 1
    });

    // 2
    db.Item.create({
        item_name: "Laura Mercier Brow Powder Duo Soft Blonde",
        item_UPC: 736150016713,
        shelf_life: 12,
        status: "In Use",
        expiry_date: "2020-07-15",
        category: "Makeup",
        price: 26.00,
        previously_used: 3,
        imageURL: "http://s.cdnsbn.com/images/products/06596424702.jpg",
        UserId: 1
    });

    // 3
    db.Item.create({
        item_name: "Nars Soft Velvet Loose Powder - Heat",
        item_UPC: 607845014263,
        shelf_life: 18,
        status: "In Use",
        expiry_date: "2020-12-15",
        category: "Makeup",
        price: 37.00,
        previously_used: 2,
        imageURL: "http://s7d9.scene7.com/is/image/LordandTaylor/607845014263_main?$PDPLARGE$",
        UserId: 1
    });

    // 4
    db.Item.create({
        item_name: "Kat Von D Studded Kiss Lipstick Homegirl",
        item_UPC: 811999020142,
        shelf_life: 7,
        status: "In Use",
        expiry_date: "2020-02-10",
        category: "Makeup",
        price: 20.00,
        previously_used: 0,
        imageURL: "http://s7d9.scene7.com/is/image/LordandTaylor/607845014263_main?$PDPLARGE$",
        UserId: 1
    });

    // 5
    db.Item.create({
        item_name: "COVER FX Contour Kit P Light Medium",
        item_UPC: 843813000030,
        shelf_life: 8,
        status: "In Use",
        expiry_date: "2019-10-25",
        category: "Makeup",
        price: 48.00,
        previously_used: 3,
        imageURL: "https://s7d9.scene7.com/is/image/JCPenney/DP0929201617095555M?wid=800&hei=800&op_sharpen=1",
        UserId: 1
    });

    //6
    db.Item.create({
        item_name: "Fenty Beauty By Rihanna Pro Filt'r Soft Matte Longwear Foundation In 310",
        item_UPC: 816657022896,
        shelf_life: 6,
        status: "History",
        expiry_date: "2019-06-25",
        category: "Makeup",
        price: 35.00,
        previously_used: 2,
        imageURL: "https://i.ebayimg.com/images/i/362500111267-0-1/s-l1600.jpg",
        UserId: 1
    });

    //Skincare items
    //1


});


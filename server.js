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
const session = require("express-session");

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "sammy" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);
const router = require("./controllers/shelfController");
app.use(router);

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

    //=============================================================DATA FOR TESTING=============================================================
    db.User.create({ email: "shelf@trilogy.com", name: "Kelly", tax_rate: 0.0625 });
    db.User.create({ email: "mark@techsonmusic.com", name: "Mark", tax_rate: 0.0625 });

    // Kelly's items
    // Makeup Items
    // 1 In Use
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

    // 2 In Use
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

    // 3 In Use
    db.Item.create({
        item_name: "Nars Soft Velvet Loose Powder - Heat",
        item_UPC: 607845014263,
        shelf_life: 20,
        status: "In Use",
        expiry_date: "2020-12-15",
        category: "Makeup",
        price: 37.00,
        previously_used: 2,
        imageURL: "http://s7d9.scene7.com/is/image/LordandTaylor/607845014263_main?$PDPLARGE$",
        UserId: 1
    });

    // 4 In Use
    db.Item.create({
        item_name: "Kat Von D Studded Kiss Lipstick Homegirl",
        item_UPC: 811999020142,
        shelf_life: 18,
        status: "In Use",
        expiry_date: "2020-02-10",
        category: "Makeup",
        price: 20.00,
        previously_used: 0,
        imageURL: "http://ecx.images-amazon.com/images/I/31vTnbdijyL._SL160_.jpg",
        UserId: 1
    });

    // 5 In Use
    db.Item.create({
        item_name: "COVER FX Contour Kit P Light Medium",
        item_UPC: 843813000030,
        shelf_life: 16,
        status: "In Use",
        expiry_date: "2019-10-25",
        category: "Makeup",
        price: 48.00,
        previously_used: 3,
        imageURL: "https://s7d9.scene7.com/is/image/JCPenney/DP0929201617095555M?wid=800&hei=800&op_sharpen=1",
        UserId: 1
    });

    // 6 History
    db.Item.create({
        item_name: "Fenty Beauty By Rihanna Pro Filt'r Soft Matte Longwear Foundation In 310",
        item_UPC: 816657022896,
        shelf_life: 12,
        status: "History",
        expiry_date: "2019-01-25",
        category: "Makeup",
        price: 35.00,
        previously_used: 2,
        imageURL: "https://i.ebayimg.com/images/i/362500111267-0-1/s-l1600.jpg",
        UserId: 1
    });

    // 7 New
    db.Item.create({
        item_name: "Too Faced Chocolate Bar Eyeshadow Palette",
        item_UPC: 651986410132,
        shelf_life: 24,
        status: "New",
        expiry_date: "2021-03-28",
        category: "Makeup",
        price: 49.00,
        previously_used: 0,
        imageURL: "https://dyn-images.hsn.com/is/image/HomeShoppingNetwork/310331?$prodzoom$",
        UserId: 1
    });

    // 8 History
    db.Item.create({
        item_name: "Urban Decay All Nighter Setting Spray - Summer Solstice",
        item_UPC: 3605972169839,
        shelf_life: 6,
        status: "History",
        expiry_date: "2019-03-28",
        category: "Makeup",
        price: 33.00,
        previously_used: 2,
        imageURL: "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/13065973_fpx.tif?wid=300&fmt=jpeg&qlt=100",
        UserId: 1
    });

    // Skincare items
    // 1 In Use
    db.Item.create({
        item_name: "TATCHA The Water Cream",
        item_UPC: 653341121028,
        shelf_life: 8,
        status: "In Use",
        expiry_date: "2019-09-18",
        category: "Skincare",
        price: 68.00,
        previously_used: 0,
        imageURL: "https://images.qvc.com/is/image/a/65/a291365.001?$uslarge$",
        UserId: 1
    });

    // 2 In Use
    db.Item.create({
        item_name: "Supergoop Everyday SPF 50 with Cellular Response Technology",
        item_UPC: 857250005107,
        shelf_life: 9,
        status: "In Use",
        expiry_date: "2019-08-07",
        category: "Skincare",
        price: 32.00,
        previously_used: 3,
        imageURL: "https://s4.thcdn.com/productimg/960/960/11289905-8854394381290899.jpg",
        UserId: 1
    });

    // 3 In Use
    db.Item.create({
        item_name: "Farmacy Green Clean Makeup Meltaway Cleansing Balm",
        item_UPC: 691043035816,
        shelf_life: 6,
        status: "In Use",
        expiry_date: "2019-11-21",
        category: "Skincare",
        price: 25.00,
        previously_used: 3,
        imageURL: "https://i.ebayimg.com/images/i/264375341763-0-1/s-l1600.jpg",
        UserId: 1
    });

    // 4 In Use
    db.Item.create({
        item_name: "Philosophy Take A Deep Breath Eye Oxygenating Eye Gel Cream",
        item_UPC: 604079171588,
        shelf_life: 8,
        status: "In Use",
        expiry_date: "2020-02-02",
        category: "Skincare",
        price: 42.00,
        previously_used: 0,
        imageURL: "https://images.qvc.com/is/image/a/13/a339613.001?$uslarge$",
        UserId: 1
    });

    // 5 History
    db.Item.create({
        item_name: "Drunk Elephant Virgin Marula Luxury Facial Oil",
        item_UPC: 856556004821,
        shelf_life: 12,
        status: "History",
        expiry_date: "2019-05-05",
        category: "Skincare",
        price: 72.00,
        previously_used: 2,
        imageURL: "https://s7d9.scene7.com/is/image/JCPenney/2f01a912-626f-11e8-8069-0fa9c140d16b?wid=800&hei=800&op_sharpen=1",
        UserId: 1
    });

    // 6 History
    db.Item.create({
        item_name: "The Ordinary Niacinamide 10% + Zinc 1% High Strength Vitamin and Mineral Blemish",
        item_UPC: 696535343790,
        shelf_life: 9,
        status: "History",
        expiry_date: "2019-01-30",
        category: "Skincare",
        price: 5.90,
        previously_used: 1,
        imageURL: "https://i.ebayimg.com/images/i/372670312418-0-1/s-l1600.jpg",
        UserId: 1
    });

    // 7 History
    db.Item.create({
        item_name: "GlamGlow THIRSTYMUD Hydrating Treatment",
        item_UPC: 713757240833,
        shelf_life: 12,
        status: "History",
        expiry_date: "2019-04-05",
        category: "Skincare",
        price: 69.00,
        previously_used: 2,
        imageURL: "http://s4.thcdn.com/productimg/960/960/10951263-2064439448066549.jpg",
        UserId: 1
    });

    // 8 Wish List
    db.Item.create({
        item_name: "Origins Original Skin™ Matte Moisturizer with Willowherb",
        item_UPC: 717334225671,
        shelf_life: 16,
        status: "Wish List",
        expiry_date: null,
        category: "Skincare",
        price: 36.00,
        previously_used: 0,
        imageURL: "https://s7d9.scene7.com/is/image/JCPenney/DP1101201706383538M?wid=800&hei=800&op_sharpen=1",
        UserId: 1
    });

    // 9 Wish List
    db.Item.create({
        item_name: "Tata Harper Skincare Clarifying Cleanser",
        item_UPC: 813269021705,
        shelf_life: 18,
        status: "Wish List",
        expiry_date: null,
        category: "Skincare",
        price: 68.00,
        previously_used: 0,
        imageURL: "https://n.nordstrommedia.com/id/sr3/7e66fc80-fe7c-462f-8570-8b3ab35a4f24.jpeg",
        UserId: 1
    });

    // Hair items
    // 1 In Use
    db.Item.create({
        item_name: "Olaplex No 5 Bond Maintenance Conditioner",
        item_UPC: 896364002435,
        shelf_life: 16,
        status: "In Use",
        expiry_date: "2020-08-10",
        category: "Hair",
        price: 28.00,
        previously_used: 0,
        imageURL: "https://i.ebayimg.com/images/i/223315732361-0-1/s-l1600.jpg",
        UserId: 1
    });

    // 2 In use
    db.Item.create({
        item_name: "Briogeo Scalp Revival Charcoal and Coconut Oil Shampoo",
        item_UPC: 019962558412,
        shelf_life: 18,
        status: "In Use",
        expiry_date: "2020-06-22",
        category: "Hair",
        price: 42.00,
        previously_used: 2,
        imageURL: "https://images.qvc.com/is/image/a/22/a363022.001?$uslarge$",
        UserId: 1
    });

    // 3 In Use
    db.Item.create({
        item_name: "OGX Renewing Weightless Healing Dry Oil Spray",
        item_UPC: 022796916204,
        shelf_life: 20,
        status: "In Use",
        expiry_date: "2020-10-10",
        category: "Hair",
        price: 6.00,
        previously_used: 0,
        imageURL: "https://pics.drugstore.com/prodimg/373859/450.jpg",
        UserId: 1
    });

    // 4 Wish List
    db.Item.create({
        item_name: "Briogeo Blossom & Bloom Volumizing Conditioner",
        item_UPC: 696859244131,
        shelf_life: 18,
        status: "Wish List",
        expiry_date: null,
        category: "Hair",
        price: 23.00,
        previously_used: 1,
        imageURL: "http://ecx.images-amazon.com/images/I/21Jh4b%2BJODL._SL160_.jpg",
        UserId: 1
    });

    // Fragrance items
    // 1 In Use
    db.Item.create({
        item_name: "Gucci Flora By Gucci Gorgeous Gardenia Eau De Toilette Spray For Women ",
        item_UPC: 140032338068,
        shelf_life: 50,
        status: "In Use",
        expiry_date: "2021-07-08",
        category: "Fragrance",
        price: 100.00,
        previously_used: 0,
        imageURL: "http://www.perfumeemporium.com/BigPics_w/Flora-by-gucci-gorgeous-gar.jpg",
        UserId: 1
    });

    // 2 In Use
    db.Item.create({
        item_name: "Yves Saint Laurent Black Opium Eau De Parfum Spray",
        item_UPC: 3365440787971,
        shelf_life: 42,
        status: "In Use",
        expiry_date: "2022-04-18",
        category: "Fragrance",
        price: 115.00,
        previously_used: 0,
        imageURL: "http://ecx.images-amazon.com/images/I/51WLcoQ0dfL._SL160_.jpg",
        UserId: 1
    });

    // 3 History
    db.Item.create({
        item_name: "Chance Eau Tendre Eau De Toilette Spray",
        item_UPC: 616348846776,
        shelf_life: 36,
        status: "History",
        expiry_date: "2019-03-26",
        category: "Fragrance",
        price: 85.00,
        previously_used: 3,
        imageURL: "http://ecx.images-amazon.com/images/I/31EddT4utYL._SL160_.jpg",
        UserId: 1
    });

    // 4 New
    db.Item.create({
        item_name: "Versace Bright Crystal EDT Spray",
        item_UPC: 8011003817498,
        shelf_life: 60,
        status: "New",
        expiry_date: "2023-12-15",
        category: "Fragrance",
        price: 75.00,
        previously_used: 0,
        imageURL: "https://www.boscovs.com/wcsstore/boscovs/images/store/product/images/495769752510032new.jpg",
        UserId: 1
    });

    // 5 Wish List
    db.Item.create({
        item_name: "Viktor & Rolf Flowerbomb Women's 3.4-ounce Eau de Parfum Spray",
        item_UPC: 3360374000059,
        shelf_life: 38,
        status: "Wish List",
        expiry_date: null,
        category: "Fragrance",
        price: 165.00,
        previously_used: 1,
        imageURL: "http://ecx.images-amazon.com/images/I/41Q20tpS1LL._SL160_.jpg",
        UserId: 1
    });

    // Other items
    // 1 In Use
    db.Item.create({
        item_name: "Beauty Blender Micro Mini Sponge, Green(Pack of 2)",
        item_UPC: 851610005219,
        shelf_life: 2,
        status: "In Use",
        expiry_date: "2019-07-19",
        category: "Other",
        price: 18.00,
        previously_used: 4,
        imageURL: "http://ecx.images-amazon.com/images/I/41kuCDRkKWL._SL160_.jpg",
        UserId: 1
    });

    // 2 In Use
    db.Item.create({
        item_name: "St. Tropez Gradual Tan Everyday Body Moisturizer, Medium/Dark",
        item_UPC: 5060022300538,
        shelf_life: 16,
        status: "In Use",
        expiry_date: "2020-02-05",
        category: "Other",
        price: 42.00,
        previously_used: 2,
        imageURL: "http://ecx.images-amazon.com/images/I/31y2kQ-GPGL._SL160_.jpg",
        UserId: 1
    });

    // 3 History
    db.Item.create({
        item_name: "SEPHORA COLLECTION Get Glowing Highlighting Brush Set",
        item_UPC: 400018064399,
        shelf_life: 36,
        status: "History",
        expiry_date: null,
        category: "Other",
        price: 45.00,
        previously_used: 0,
        imageURL: "https://s7d9.scene7.com/is/image/JCPenney/DP0708201617180776M?wid=800&hei=800&op_sharpen=1",
        UserId: 1
    });

    // 4 New
    db.Item.create({
        item_name: "Fresh Brown Sugar Body Polish",
        item_UPC: 809280107313,
        shelf_life: 20,
        status: "New",
        expiry_date: null,
        category: "Other",
        price: 39.00,
        previously_used: 0,
        imageURL: "http://s.cdnsbn.com/images/products/10379799903.jpg",
        UserId: 1
    });

    // 5 Wish List
    db.Item.create({
        item_name: "Herbivore Jade Facial Roller",
        item_UPC: 853040006880,
        shelf_life: null,
        status: "Wish List",
        expiry_date: null,
        category: "Other",
        price: 30.00,
        previously_used: 0,
        imageURL: "https://s7d9.scene7.com/is/image/JCPenney/3312e28c-6fcb-11e8-a4d0-c97530db13cc?wid=800&hei=800&op_sharpen=1",
        UserId: 1
    });


    // Mark's items
    // Makeup
    db.Item.create({
        item_name: "Tarte Treasure Pot Glitter Gel",
        item_UPC: 846733031832,
        shelf_life: null,
        status: "Wish List",
        expiry_date: null,
        category: "Makeup",
        price: 18.00,
        previously_used: 0,
        imageURL: "https://slimages.macysassets.com/is/image/MCY/products/7/optimized/12334627_fpx.tif?wid=300&fmt=jpeg&qlt=100",
        UserId: 2
    });

    db.Item.create({
        item_name: "Tarte Treasure Pot Glitter Gel",
        item_UPC: 846733031832,
        shelf_life: null,
        status: "Wish List",
        expiry_date: null,
        category: "Makeup",
        price: 18.00,
        previously_used: 0,
        imageURL: "https://slimages.macysassets.com/is/image/MCY/products/7/optimized/12334627_fpx.tif?wid=300&fmt=jpeg&qlt=100",
        UserId: 2
    });

    db.Item.create({
        item_name: "MILK MAKEUP Glitter Stick",
        item_UPC: 814333022857,
        shelf_life: null,
        status: "In Use",
        expiry_date: null,
        category: "Makeup",
        price: 30.00,
        previously_used: 1,
        imageURL: "https://s7d9.scene7.com/is/image/JCPenney/DP0207201807071136M?wid=800&hei=800&op_sharpen=1",
        UserId: 2
    });

    db.Item.create({
        item_name: "Anastasia Beverly Hills Loose Glitter",
        item_UPC: 689304230049,
        shelf_life: null,
        status: "History",
        expiry_date: null,
        category: "Makeup",
        price: 15.00,
        previously_used: 2,
        imageURL: "https://slimages.macysassets.com/is/image/MCY/products/0/optimized/10238887_fpx.tif?wid=300&fmt=jpeg&qlt=100",
        UserId: 2
    });

    // Skincare
    db.Item.create({
        item_name: "Anastasia Beverly Hills Loose Glitter",
        item_UPC: 689304230049,
        shelf_life: null,
        status: "History",
        expiry_date: null,
        category: "Makeup",
        price: 15.00,
        previously_used: 2,
        imageURL: "https://slimages.macysassets.com/is/image/MCY/products/0/optimized/10238887_fpx.tif?wid=300&fmt=jpeg&qlt=100",
        UserId: 2
    });

    // Hair

    // Fragrance

    // Other

});


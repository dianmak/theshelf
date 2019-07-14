$(function () {

    $.get("/api/myshelf", function (result) {
        console.log(result);
        result.forEach(element => {
            $("#shelfdisplay").append(`
            <div class="d-inline-block card" style="width: 18rem;">
            <img src=${element.imageURL} class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.item_name}</h5>
                <p class="card-text">Category: ${element.category}</p>
                <button type="button" class="btn btn-primary" onclick="viewMore(${element.id})">More</button>
            </div>
            </div>
            `);
        });
    });

    // If user clicks a different status, empty the page, make a new get request with the chosen category then populate the page
    $(".statusbutton").on("change", function (e) {
        e.preventDefault();

        $("#shelfdisplay").empty();
        $("#tagbuttons").empty();
        // console.log($(this).attr("value"));
        $.get("/api/items/status/" + $(this).attr("value"), function (result) {
            console.log(result);
            result.forEach(element => {
                $("#shelfdisplay").append(`
                <div class="d-inline-block card" style="width: 18rem;">
                <img src=${element.imageURL} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.item_name}</h5>
                    <p class="card-text">Category: ${element.category}</p>
                    <button type="button" class="btn btn-primary" onclick="viewMore(${element.id})">More</button>
                </div>
                </div>
                `);
            });
        });
    });

    //when My Tags button is clicked, clear the page and dynamically render buttons with all user tags
    $("#mytags").on("change", function (e) {
        e.preventDefault();

        $("#shelfdisplay").empty();
        $("#tagbuttons").empty();
        $("#tagbuttons").append(`<br><div id ="labels" class="btn-group btn-group-toggle text-center" data-toggle="buttons"></div>`);
        $("#labels").append(`<div><label class="btn btn-secondary">
        <input class="tagsbutton" type="radio" name="options" autocomplete="off" value="Moisturizer">Moisturizer</label><label class="btn btn-secondary">
        <input class="tagsbutton" type="radio" name="options" autocomplete="off" value="Eyes">Eyes</label></div>`);

        $(".tagsbutton").on("change", function (e) {
            e.preventDefault();
            $("#shelfdisplay").empty();

            $.get("/api/items/tag/" + $(this).attr("value"), function (result) {
                console.log(result);
                result.forEach(element => {
                    $("#shelfdisplay").append(`
                <div class="d-inline-block card" style="width: 18rem;">
                <img src=${element.imageURL} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.item_name}</h5>
                    <p class="card-text">Category: ${element.category}</p>
                    <button type="button" class="btn btn-primary" onclick="viewMore(${element.id})">More</button>
                </div>
                </div>
                `);
                });
            });
        });
    });



    //add item by input form (still needs incorporation of input form)
    $("insertbuttonhere").click(function (e) {
        e.preventDefault();

        $.post("/api/myshelf/additem", function (result) {
        });
    });



    //add item by UPC code

    //append popovers

    $('[id="upc-popover"]').popover({
        placement: 'right',
        trigger: 'hover',
        html: true,
        content: '<img src="/assets/images/upc.jpg" alt="UPC" style="height:100px" class="center"><p>12 numeric digits found under item barcode</p>'
    });

    $('[id="item-name-popover"]').popover({
        placement: 'right',
        trigger: 'hover',
        html: true,
        content: '<p>Required</p>'
    });

    $('[id="shelf-life-popover"]').popover({
        placement: 'right',
        trigger: 'hover',
        html: true,
        content: '<img src="/assets/images/shelf_life.jpg" alt="Shelf Life" style="height:30px" class="center"><p>Enter number listed on item packaging</p>'
    });
    $('[id="tag-popover"]').popover({
        placement: 'right',
        trigger: 'hover',
        html: true,
        content: '<p>Enter custom label for your item</p>'
    });
    $('[id="img-popover"]').popover({
        placement: 'right',
        trigger: 'hover',
        html: true,
        content: '<p>Right click on item image, click on Copy image address, and paste the link</p>'
    });


    // This .on("click") function will trigger the AJAX Call
    $("#searchByUPC").on("click", function (event) {
        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();


        $("#item_UPC_warning_msg").empty();

        if ($("#item_UPC").val().trim().length === 12 || !isNaN($("#item_UPC")) || ($("#item_UPC")) === null) {
            // Here we grab the text from the input box
            var upc = $("#item_UPC").val().trim();

            // Here we construct our URL
            var queryURL = "http://localhost:8080/lookup/" + upc

            //Empty warning message
            $("#item_UPC_warning_msg").append();

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response.code);
                if (response.code === "OK" && response.items.length > 0) {
                    $("#item_name").val(response.items[0].title).val();
                    $("#price").val(response.items[0].offers[0].price).val();
                    $("#imageURL").val(response.items[0].images[0]).val()
                }
                else {
                    $("#item_UPC_warning_msg").append("Item not found")
                }
            });


        } else {

            $("#item_UPC_warning_msg").append("Please enter a 12 digit UPC code to search")
        }
    });

    $("#addToShelf").on("click", function (event) {
        event.preventDefault();

        $("#item_name_warning_msg").empty();
        $("#item_UPC_warning_msg").empty();

        //Here we will determine if tax rate needs to be applied to the product
        if ($("#add_tax").is(':checked')) {
            //how to capture logged in user tax rate?
            var tax_rate = 0.0625;
        } else {
            var tax_rate = 0;
        }

        //Here we calculate the expiry date based on today's date and user provided shelf life
        shelf_life = Number($("#shelf_life").val().trim());
        if (shelf_life > !0) {
            shelf_life = 0
        }

        var d = new Date();
        var dt = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate());
        dt.setMonth(dt.getMonth() + shelf_life);

        if ($("#item_name").val().trim() === "" || ($("#item_name")) === null) {
            $("#item_name_warning_msg").append("Item name is required")
        } else {
            // Here we pass undefined to the database if the shelf_life form field is blank
            if ($("#shelf_life").val().trim() === "") {
                var shelf_life = undefined
            } else {
                var shelf_life = $("#shelf_life").val().trim()
            };

            // Here we pass undefined to the database if the price form field is blank
            if ($("#price").val().trim() === "") {
                var price = undefined
            } else {
                var price = $("#shelf_life").val().trim()
            };

            // Here we pass placeholder image to the database if the imageURL form field is blank
            if ($("#imageURL").val().trim() === "") {



                var imageURL = "assets/images/product-image-placeholder.jpg"
            } else {
                var imageURL = $("#imageURL").val().trim()
            };

            //Add if statement for if empty pass undefinded
            var newItem = {
                item_name: $("#item_name").val().trim(),
                item_UPC: $("#item_UPC").val().trim(),
                imageURL: imageURL,
                shelf_life: shelf_life,
                category: $("#category").val().trim(),
                price: price,
                status: $("#status").val().trim(),
                label: $("#tag").val().trim(),
                tax: $("#price").val().trim() * tax_rate,
                expiry_date: dt.toLocaleDateString()

            };

            console.log(newItem);

            addItem(newItem);
            clear();
            $("#addByUPC").modal('hide')
        };
    });

    // Add new item to the database
    function addItem(newItem) {
        $.post("/api/items", newItem)
            // On success, run the following code
            .then(function (data) {
                // Log the data we found
                console.log(data);
            });
    }

    // Empty each input box by replacing the value with an empty string
    function clear() {
        $("#item_name").val("");
        $("#imageURL").val("");
        $("#shelf_life").val("");
        $("#price").val("");
        $("#item_UPC").val("")
        $("#tag").val("")
        $('input[type="checkbox"]').prop('checked', true);
        $("#item_UPC_warning_msg").empty();
    }

    // Save changes made to existing item
    $(document).on("click", "#editItem", function (event) {
        event.preventDefault();

        let thisid = $(this).prop("value");
        let edits = {
            item_name: $("#item_name_edit").val(),
            imageURL: $("#imageURL_edit").val(),
            shelf_life: $("#shelf_life_edit").val(),
            status: $("#status_edit").val(),
            category: $("#category_edit").val(),
            label: $("#tags_edit").val(),
            price: $("#price_edit").val(),
            id: thisid
        };

        $.ajax({
            url: "/api/myshelf/edititem",
            method: "PUT",
            data: edits
        }).then(function (response) {
            console.log(response);
        });
    });

    $(document).on("click", "#retireItem", function (event) {

        event.preventDefault();
        console.log("HERE");
        let thisid = $(this).prop("value");

        $.ajax({
            url: "/api/myshelf/retireitem",
            method: "DELETE",
            data: { id: thisid }
        }).then(function (response) {
            console.log(response);
        });
    });

});
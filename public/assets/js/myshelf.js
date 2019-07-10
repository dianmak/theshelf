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
                <a href="#" class="btn btn-primary">More</a>
            </div>
            </div>
            `);
        });
    });

    // If user clicks a different status, empty the page, make a new get request with the chosen category then populate the page
    $(".statusbutton").on("change", function (e) {
        e.preventDefault();

        $("#shelfdisplay").empty();
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
                    <a href="#" class="btn btn-primary">More</a>
                </div>
                </div>
                `);
            });
        });
    });



    //add item by input form (still needs incorporation of input form)
    $("insertbuttonhere").click(function (e) {
        e.preventDefault();

        $.post("/api/myshelf/additem", function (result) {
            console.log("Added new item.");
        });
    });


    //add item by UPC code
    // This .on("click") function will trigger the AJAX Call
    $("#searchByUPC").on("click", function (event) {
        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();

        // Here we grab the text from the input box
        var upc = $("#item_UPC").val().trim();

        // Here we construct our URL
        var queryURL = "http://localhost:8080/lookup/" + upc


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log('Product: ' + response.items[0].title);
            // console.log('UPC: ' + response.items[0].upc);
            // console.log('Image: ' + response.items[0].images[0]);
            // console.log('Price: ' + response.items[0].offers[0].price);
            $("#item_name").val(response.items[0].title).val();
            $("#price").val(response.items[0].offers[0].price).val();
            $("#item_img").val(response.items[0].images[0]).val();
        });

    })

    $("#addToShelf").on("click", function (event) {
        console.log("Custom on click button registered");
        event.preventDefault();
        var newItem = {
            item_name: $("#item_name").val().trim(),
            item_img: $("#item_img").val().trim(),
            shelf_life: $("#shelf_life").val().trim(),
            category: $("#category").val().trim(),
            price: $("#price").val().trim(),
            status: $("#status").val().trim()
        };

        addItem(newItem);
        clear();
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
        $("#item_img").val("");
        $("#shelf_life").val("");
        $("#category").val("");
        $("#status").val("");
        $("#price").val("");
    }

    //edit item


});
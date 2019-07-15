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
                <button type="button" class="btn btn-primary" id="viewMore" value=${element.id})>More</button>
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
                    <button type="button" class="btn btn-primary" id="viewMore" value=${element.id}>More</button>
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
        });
    });



    //add item by UPC code

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

                //CAN WE COME UP WITH A FUN PLACEHOLDER IMAGE?
                var imageURL = "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png"
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
            previously_used: $("#previous_edit").val(),
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



    $(document).on("click", "#viewMore", function () {
        let id = $(this).prop("value");
        console.log(id);
        $("#modals").append(`

    <!-- Modal -->
    <div class="modal fade" id="viewmore" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Item</h4>
                </div>
                <div class="modal-body">
                <form action="" method="POST" role="form">
                        <div class="form-group">
                            <label for="">Item Name</label>
                            <input type="text" class="form-control" id="item_name_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Image Link</label>
                            <input type="text" class="form-control" id="imageURL_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Shelf Life (in months)</label>
                            <input type="number" class="form-control" id="shelf_life_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="category">Status</label>
                            <select class="form-control" id="status_edit">
                                <option value="In Use">In Use</option>
                                <option value="New">New</option>
                                <option value="History">History</option>
                                <option value="Wish List">Wish List</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="category">Category</label>
                            <select class="form-control" id="category_edit">
                                <option value="Makeup">Makeup</option>
                                <option value="Skincare">Skincare</option>
                                <option value="Hair">Hair</option>
                                <option value="Fragrance">Fregnance</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">Previously Used</label>
                            <input type="text" class="form-control" id="previous_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Tags</label>
                            <input type="text" class="form-control" id="tags_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Price</label>
                            <input type="number" class="form-control" id="price_edit" placeholder="">
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="addTax_edit">
                            <label class="form-check-label" for="defaultCheck1">
                                Calculate Tax
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal" id="editItem" value=${id} >Save Changes</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" id="retireItem" value=${id} >I am finished with this item.</button>
                </div>
            </div>
        </div>
    </div>
    `);

        $.get("/api/items/id/" + id, function (result) {
            $("#item_name_edit").val(result.item_name);
            $("#imageURL_edit").val(result.imageURL);
            $("#shelf_life_edit").val(result.shelf_life);
            $("#status_edit").val(result.status).prop('selected', true);
            $("#category_edit").val(result.category).prop('selected', true);
            $("#tags_edit").val(result.label);
            $("#price_edit").val(result.price);
            $("#previous_edit").val(result.previously_used);
        });

        $("#viewmore").modal("show");
    });

});
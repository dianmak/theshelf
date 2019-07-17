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
                <button type="button" class="btn btn-primary" id="viewMore" value=${element.id}>More</button>
            </div>
            </div>
            `);
        });
    });

    // If user clicks a different status, empty the page, make a new get request with the chosen category then populate the page
    $(".statusbutton").on("change", function (e) {
        e.preventDefault();

        $("#shelfdisplay").empty();
        $("#labels").empty();
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

    //When My Categories button is clicked, clear the page and dynamically render buttons with all user tags
    $("#mycategories").on("change", function (e) {
        e.preventDefault();

        $("#shelfdisplay").empty();
        $("#labels").empty();

        //Find all user tags and create buttons with each distinct tag
        $.get("/api/items/allcategories/", function (result) {
            console.log(result);
            result.forEach(element => {
                $("#labels").append(`<label class="btn btn-secondary">
            <input class="tagsbutton" type="radio" name="options" autocomplete="off" value="${element.category}">${element.category}</label>`);
            });
        });

        $(document).on("change", ".tagsbutton", function (e) {
            e.preventDefault();

            $("#shelfdisplay").empty();

            $.get("/api/items/category/" + $(this).attr("value"), function (result) {

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
    });

    //When My Tags button is clicked, clear the page and dynamically render buttons with all user tags
    $("#mytags").on("change", function (e) {
        e.preventDefault();
        $("#shelfdisplay").empty();
        $("#labels").empty();

        //Find all user tags and create buttons with each distinct tag
        $.get("/api/items/alltags/", function (result) {
            console.log(result);
            result.forEach(element => {
                if (element.label != null) {
                    $("#labels").append(`<label class="btn btn-secondary">
                <input class="tagsbutton" type="radio" name="options" autocomplete="off" value="${element.label}">${element.label}</label>`);
                };
                console.log(element.label)
            });
        });

        $(document).on("change", ".tagsbutton", function (e) {
            e.preventDefault();

            $("#shelfdisplay").empty();

            $.get("/api/items/tag/" + $(this).attr("value"), function (result) {
                $("#shelfdisplay").empty();
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

    });

    //add item by input form (still needs incorporation of input form)
    $("insertbuttonhere").click(function (e) {
        e.preventDefault();

        $.post("/api/myshelf/additem", function (result) {
        });
    });

    //add item by UPC code

    //append popovers
    function popovers() {
        $('[class="upc-popover"]').popover({
            placement: 'right',
            trigger: 'hover',
            html: true,
            content: '<img src="/assets/images/upc.jpg" alt="UPC" style="height:100px" class="center">12 numeric digits found under item barcode'
        });

        $('[class="item-name-popover"]').popover({
            placement: 'right',
            trigger: 'hover',
            html: true,
            content: 'Required'
        });

        $('[class="shelf-life-popover"]').popover({
            placement: 'right',
            trigger: 'hover',
            html: true,
            content: '<img src="/assets/images/shelf_life.jpg" alt="Shelf Life" style="height:30px" class="center">Enter number listed on item packaging'
        });
        $('[class="tag-popover"]').popover({
            placement: 'right',
            trigger: 'hover',
            html: true,
            content: 'Enter custom label for your item'
        });
        $('[class="img-popover"]').popover({
            placement: 'right',
            trigger: 'hover',
            html: true,
            content: function () {
                return '<img class="img-fluid" src="' + $("#imageURL").val().trim() + '" alt="Image preview" style="height:200px" class="center" />';
            },
        });
        $('[class="img-popover-edit"]').popover({
            placement: 'right',
            trigger: 'hover',
            html: true,
            content: function () {
                return '<img class="img-fluid" src="' + $("#imageURL_edit").val().trim() + '" alt="Image preview" style="height:200px" class="center" />';
            },
        });
    };
    popovers();


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
            var queryURL = "/lookup/" + upc

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

            var tax_rate = 0.0625;
        } else {
            var tax_rate = 0;
        }

        //Here we calculate the expiry date based on today's date and user provided shelf life
        shelf_life = Number($("#shelf_life").val().trim());
        if (shelf_life < 1) {
            shelf_life = 0;
            var expiryDate = undefined
        } else {
            var d = new Date();
            var dt = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate());
            dt.setMonth(dt.getMonth() + shelf_life);
            var expiryDate = dt.toLocaleDateString()
        }


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
                var price = $("#price").val().trim()
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
                expiry_date: expiryDate

            };

            console.log(newItem);

            addItem(newItem);
            clear();
            $("#addByUPC").modal('hide');
            location.reload();
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

        if ($("#expiry_date_edit").val().trim() === "") {
            var expiryDate = undefined
        } else {
            var d = new Date($("#expiry_date_edit").val());
            var dt = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + (d.getDate() + 1));
            var expiryDate = dt.toLocaleDateString()
        };
        console.log(expiryDate);
        if ($("#rating_edit").val().trim() === "") {
            var ratingEdit = undefined
        } else {
            var ratingEdit = $("#rating_edit").val().trim()
        };

        if ($("#price_edit").val().trim() === "") {
            var price = undefined
        } else {
            var price = $("#price_edit").val().trim()
        };

        if ($("#shelf_life_edit").val().trim() === "") {
            var shelf_life = undefined
        } else {
            var shelf_life = $("#shelf_life_edit").val().trim()
        };

        let thisid = $(this).prop("value");
        let edits = {
            item_name: $("#item_name_edit").val(),
            imageURL: $("#imageURL_edit").val(),
            shelf_life: shelf_life,
            status: $("#status_edit").val(),
            category: $("#category_edit").val(),
            label: $("#tags_edit").val(),
            price: price,
            previously_used: $("#previous_edit").val(),
            rating: ratingEdit,
            review: $("#review_edit").val(),
            expiry_date: expiryDate,
            id: thisid
        };

        console.log(edits.shelf_life);
        if (edits.shelf_life === '') {
            edits.shelf_life = null;
        }

        $.ajax({
            url: "/api/myshelf/edititem",
            method: "PUT",
            data: edits
        }).then(function (response) {
            console.log(response);
            location.reload();
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
                            <label for="">Item Name  <span data-toggle="popover" class="item-name-popover"><i
                            class="fa fa-exclamation" aria-hidden="true" 2x></i></span></label>
                            <input type="text" class="form-control" id="item_name_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Image Link  <span data-toggle="popover" class="img-popover-edit"><i
                            class="fa fa-picture-o" aria-hidden="true" 2x></i></span></label>
                            <input type="text" class="form-control" id="imageURL_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Shelf Life   <span data-toggle="popover" class="shelf-life-popover"><i
                            class="fa fa-question" aria-hidden="true" 2x></i></span></label>
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
                            <label for="">Tags  <span data-toggle="popover" class="tag-popover"><i
                            class="fa fa-tag" aria-hidden="true" 2x></i></span></label>
                            <input type="text" class="form-control" id="tags_edit" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="">Price</label>
                            <input type="number" class="form-control" id="price_edit" placeholder="">
                        </div>
                        <div class="form-group">
                        <label for="">Expiration Date</label>
                        <input type="date" class="form-control" id="expiry_date_edit" placeholder="">
                    </div>
                        <div class="form-group">
                        <label for="">Rating</label>
                        <input type="text" class="form-control" id="rating_edit" placeholder="">
                    </div>
                    <div class="form-group">
                    <label for="">Review</label>
                    <input type="text" class="form-control" id="review_edit" placeholder="">
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
        popovers();

        $.get("/api/items/id/" + id, function (result) {
            $("#item_name_edit").val(result.item_name);
            $("#imageURL_edit").val(result.imageURL);
            $("#shelf_life_edit").val(result.shelf_life);
            $("#status_edit").val(result.status).prop('selected', true);
            $("#category_edit").val(result.category).prop('selected', true);
            $("#tags_edit").val(result.label);
            $("#price_edit").val(result.price);
            $("#previous_edit").val(result.previously_used);
            $("#rating_edit").val(result.rating);
            $("#review_edit").val(result.review);
            $("#expiry_date_edit").val(result.expiry_date);
        });

        $("#viewmore").modal("show");
    });

});
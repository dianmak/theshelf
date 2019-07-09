$(document).ready(function () {

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

});






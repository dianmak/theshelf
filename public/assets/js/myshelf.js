$(function () {

    //add item by input form (still needs incorporation of input form)
    $("insertbuttonhere").click(function (e) {
        e.preventDefault();

        $.post("/api/myshelf/additem", function (result) {
            console.log("Added new item.");
        });
    });


    //add item by UPC code

    //edit item

    //get item by category
    
});
$(function () {
    $.get("/api/myshelf", function (result) {
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
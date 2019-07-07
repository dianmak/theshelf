$(function () {
    // Upon loading the page, display In Use products as default
    $.get("/api/items/home", function (result) {
        console.log(result);
        result.forEach(element => {
            $("#homedisplay").append(`
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

    // If user clicks a different status, empty the page, make a new get request with the chosen category then populate the page
    $(".statusbutton").click(function (e) {
        e.preventDefault();

        $("#homedisplay").empty();

        $.get("/api/items/status" + $(this).attr("value"), function (result) {
            result.array.forEach(element => {
                $("#homedisplay").append(`
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
});
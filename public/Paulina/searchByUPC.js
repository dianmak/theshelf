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
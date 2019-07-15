$(function () {
    $("#login").on("click", function (e) {
        console.log("hi sammy");
        e.preventDefault();
        let email = $("#inputEmail").val();

        if (email != null) {
            $.post("/login", { email }, function (result) {
                window.location.href = result.next;
            });
        }
    });
});
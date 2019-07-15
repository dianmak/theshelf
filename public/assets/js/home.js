$(function () {
    // Upon loading the page, display In Use products as default
    $.get("/api/items/home", function (result) {
        console.log(result);
        result.forEach(element => {
            $("#homedisplay").append(`
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

    // Show the next 4 expiring product that have In Use status
    $.get("/api/items/expiring", function (result) {
        console.log(result);

        result.forEach(element => {
            // if (element.expiry_date != null) {
            $("#expiring").append(`
            <div class="d-inline-block card" style="width: 18rem;">
            <img src=${element.imageURL} class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.item_name}</h5>
                <p class="card-text">Expiring: ${element.expiry_date}</p>
                <button type="button" class="btn btn-primary" onclick="viewMore(${element.id})">More</button>
            </div>
            </div>
            `)
            // }
        });

    })


    $.get("/api/home/chart", function (result) {
        const totalSpent = document.getElementById('totalSpent');

        let makeup = 0;
        let skincare = 0;
        let fragrance = 0;
        let hair = 0;
        let other = 0;

        result.forEach(element => {
            console.log(typeof element.price);
            switch (element.category) {
                case "Makeup":
                    makeup += element.price;
                    break;

                case "Skincare":
                    skincare += element.price;
                    break;

                case "Fragrance":
                    fragrance += element.price;
                    break;

                case "Hair":
                    hair += element.price;
                    break;

                case "Other":
                    other += element.price;
                    break;
            }
        });

        console.log(makeup, skincare, fragrance, hair, other);

        const barChart = new Chart(totalSpent, {
            type: 'doughnut',
            data: {
                labels: ['Makeup', 'Skincare', 'Fragrance', 'Hair', 'Other'],
                datasets: [{
                    label: 'Dollars Spent',
                    data: [makeup, skincare, fragrance, hair, other],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {

            }
        });
    });


});
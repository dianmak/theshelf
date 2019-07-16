// < !--TABLE AND CHART-- >
$(function () {
    $.get("/api/wallet/table/Makeup", function (result) {
        result.forEach(element => {
            $("#tablerow1").append(`
        <td>${element.item_name}</td>
        `);
        });
    });

    $.get("/api/wallet/table/Skincare", function (result) {
        result.forEach(element => {
            $("#tablerow2").append(`
        <td>${element.item_name}</td>
        `);
        });
    });

    $.get("/api/wallet/table/Hair", function (result) {
        result.forEach(element => {
            $("#tablerow3").append(`
        <td>${element.item_name}</td>
        `);
        });
    });

    $.get("/api/wallet/table/Fragrance", function (result) {
        result.forEach(element => {
            $("#tablerow4").append(`
        <td>${element.item_name}</td>
        `);
        });
    });

    $.get("/api/wallet/table/Other", function (result) {
        result.forEach(element => {
            $("#tablerow5").append(`
        <td>${element.item_name}</td>
        `);
        });
    });

    $.get("/api/items/status/Wish List", function (result) {
        const secondChart = document.getElementById('secondChart');

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

        let barChart = new Chart(secondChart, {
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

    $.get("/api/myshelf", function (result) {
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

        let barChart = new Chart(totalSpent, {
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
        console.log(data);
    });
});
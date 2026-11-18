
// Array to store medicines
var medicines = JSON.parse(localStorage.getItem("medicines")) || [];

// Getting HTML elements
var form = document.getElementById("medicineForm");
var stockList = document.getElementById("stockList");

// Function to display medicines
function showMedicines() {

    stockList.innerHTML = "";

    for (var i = 0; i < medicines.length; i++) {

        var m = medicines[i];

        var today = new Date();
        var expiryDate = new Date(m.expiry);

        var status = "Safe";

        // Checking expiry
        if (expiryDate < today) {
            status = "Expired";
        }
        else {
            var days = (expiryDate - today) / (1000 * 60 * 60 * 24);

            if (days <= 30) {
                status = "Expiring Soon";
            }
        }

        // Adding medicine to table
        stockList.innerHTML += "<tr>" +
            "<td>" + m.name + "</td>" +
            "<td>" + m.type + "</td>" +
            "<td>" + m.mg + "</td>" +
            "<td>" + m.quantity + "</td>" +
            "<td>" + m.received + "</td>" +
            "<td>" + m.expiry + "</td>" +
            "<td>" + status + "</td>" +
            "</tr>";
    }
}

// When Add Medicine button is clicked
form.onsubmit = function(event) {

    event.preventDefault();

    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var mg = document.getElementById("mg").value;
    var quantity = document.getElementById("quantity").value;
    var received = document.getElementById("received").value;
    var expiry = document.getElementById("expiry").value;
    var months = document.getElementById("months").value;

    // Checking expiry information
    if (expiry == "" && months == "") {
        alert("Enter expiry date or shelf life");
        return;
    }

    if (expiry != "" && months != "") {
        alert("Fill only one expiry option");
        return;
    }

    // Calculating expiry date
    if (expiry == "") {

        var date = new Date(received);

        date.setMonth(date.getMonth() + Number(months));

        expiry = date.toISOString().split("T")[0];
    }

    if (expiry < received) {
        alert("Expiry date cannot be before received date");
        return;
    }

    // Creating medicine object
    var medicine = {
        name: name,
        type: type,
        mg: mg,
        quantity: quantity,
        received: received,
        expiry: expiry
    };

    // Adding medicine to array
    medicines.push(medicine);

    // Saving data
    localStorage.setItem("medicines", JSON.stringify(medicines));

    // Displaying updated stock
    showMedicines();

    form.reset();

    alert("Medicine added successfully!");
};

// Display saved medicines
showMedicines();

// Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbzzE0boOzPQg-D25RBhOMTJsiqba6ffhW-AmMuSE2Kr2X3mkvxmVba2vza7ZQ2yW_BPvQ/exec";

const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pin = document.getElementById("pin").value.trim();

    if (pin.length !== 4 || isNaN(pin)) {
        alert("PIN must be exactly 4 digits.");
        return;
    }

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({
            request: "register",
            name: name,
            email: email,
            pin: pin
        })
    })
    .then(response => response.json())
    .then(data => {

      
if (data.success) {

    // Save the token
    localStorage.setItem("token", data.token);

    alert("Registration Successful!");

    // Go to the new home page
    window.location.href = "home.html";

} else {

    alert("Registration Failed");

}

    })
    .catch(error => {

        console.error(error);
        alert("Server Error:\n\n" + error);

    });

});

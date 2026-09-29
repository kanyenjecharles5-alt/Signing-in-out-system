// Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbyRCMn53bFX71WVnPFj5fsJHtg9-IowW0JgRWCAzOgM76FhbUoABJaPfteY7C7ooMIzxA/exec";

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

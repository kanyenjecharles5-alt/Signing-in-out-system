// =============================
// Google Apps Script URL
// =============================
const scriptURL = "https://script.google.com/macros/s/AKfycbzzE0boOzPQg-D25RBhOMTJsiqba6ffhW-AmMuSE2Kr2X3mkvxmVba2vza7ZQ2yW_BPvQ/exec";

// =============================
// Token
// =============================
const token = localStorage.getItem("token");

if (!token) {
    window.location.replace("register.html");
}

// ======================================
// Prevent accidental double processing
// ======================================
if (sessionStorage.getItem("attendanceProcessed") === "true") {
    sessionStorage.removeItem("attendanceProcessed");
    window.location.replace("home.html");
    throw new Error("Attendance already processed");
}

// =============================
// Elements
// =============================
const welcome = document.getElementById("welcome");
const status = document.getElementById("statusMessage");

// =============================
function greeting() {

    const h = new Date().getHours();

    if (h < 12) return "Good Morning ☀️";
    if (h < 17) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
}

// =============================
// Check Status
// =============================
fetch(scriptURL, {

    method: "POST",

    body: JSON.stringify({
        request: "checkStatus",
        token: token
    })

})

.then(r => r.json())

.then(data => {

    if (!data.success) {

        localStorage.removeItem("token");
        window.location.replace("register.html");
        return;

    }

    welcome.innerHTML = `👋 ${greeting()}, <strong>${data.name}</strong>`;
    status.innerHTML = "Recording attendance...";

    return fetch(scriptURL, {

        method: "POST",

        body: JSON.stringify({

            request: "attendance",
            token: token,
            action: data.nextAction

        })

    })

    .then(r => r.json())

    .then(result => {

        if (!result.success) {

            status.innerHTML = "Unable to record attendance.";
            return;

        }

        sessionStorage.setItem("lastName", data.name);
        sessionStorage.setItem("lastAction", data.nextAction);

        // Prevent a second attendance on the same page load
        sessionStorage.setItem("attendanceProcessed", "true");

        window.location.replace("home.html");

    });

})

.catch(err => {

    console.error(err);
    status.innerHTML = "Unable to connect.";

});

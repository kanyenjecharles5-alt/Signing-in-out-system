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

// =============================
// Elements
// =============================
const welcome = document.getElementById("welcome");
const status = document.getElementById("statusMessage");

const popup = document.getElementById("popup");
const popupIcon = document.getElementById("popupIcon");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");

// =============================
// Prevent Attendance Loop
// =============================
if (sessionStorage.getItem("attendanceDone") === "true") {

    sessionStorage.removeItem("attendanceDone");

    welcome.innerHTML = "✅ Attendance Recorded";
    status.innerHTML = "You can now close this page and scan the QR again later.";

    throw new Error("Attendance already processed");
}

// =============================
function greeting() {

    const h = new Date().getHours();

    if (h < 12) return "Good Morning ☀️";
    if (h < 17) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
}

// =============================
function showPopup(icon, title, message) {

    popupIcon.innerHTML = icon;
    popupTitle.innerHTML = title;
    popupMessage.innerHTML = message;

    popup.style.display = "flex";

    sessionStorage.setItem("attendanceDone", "true");

    setTimeout(() => {
        window.location.replace("home.html");
    }, 300);
}

// =============================
function recordAttendance(action) {

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({
            request: "attendance",
            token: token,
            action: action
        })
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
        }

        return response.json();
    })

    .then(data => {

        if (!data.success) {

            status.innerHTML = "Unable to record attendance.";
            return;
        }

        if (action === "IN") {

            showPopup(
                "☀️",
                "Attendance Recorded!",
                "Have a great day! 😊<br><br>Go inspire those kids."
            );

        } else {

            showPopup(
                "🎉",
                "GO HOME!!",
                "😂 You've survived another day surrounded by kids.<br><br>😄 Rest abi.<br><br>See you tomorrow ❤️"
            );
        }

    })

    .catch(error => {

        console.error(error);
        status.innerHTML = "Unable to record attendance.";
    });

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

.then(response => {

    if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
    }

    return response.json();
})

.then(data => {

    if (!data.success) {

        localStorage.removeItem("token");
        window.location.replace("register.html");
        return;
    }

    welcome.innerHTML = `👋 ${greeting()}, <strong>${data.name}</strong>`;

    status.innerHTML = "Checking attendance...";

    setTimeout(() => {

        recordAttendance(data.nextAction);

    }, 300);

})

.catch(error => {

    console.error(error);
    status.innerHTML = "Unable to connect.";

});

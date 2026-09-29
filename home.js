// =============================
// HOME PAGE (Display Only)
// =============================

// Elements
const status = document.getElementById("status");
const details = document.getElementById("details");
const nameText = document.getElementById("name");
const timeText = document.getElementById("time");
const actionText = document.getElementById("action");

// Retrieve data saved by index.js
const name = localStorage.getItem("lastName");
const action = localStorage.getItem("lastAction");
const time = localStorage.getItem("lastTime");

// If someone somehow opens home.html directly
if (!name || !action || !time) {
    window.location.replace("index.html");
}

// Display information
status.innerHTML = "✅ Attendance Recorded";
details.style.display = "block";

nameText.innerHTML = name;
timeText.innerHTML = "🕒 " + time;

if (action === "IN") {
    actionText.innerHTML = "☀️ Signed In";
} else {
    actionText.innerHTML = "🏠 Signed Out";
}

// After 3 seconds clear the display
setTimeout(() => {

    status.innerHTML = "Ready for the next scan.";
    details.style.display = "none";

    // Optional: clear old data
    localStorage.removeItem("lastName");
    localStorage.removeItem("lastAction");
    localStorage.removeItem("lastTime");

}, 3000);

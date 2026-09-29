// =============================
// HOME PAGE (DISPLAY ONLY)
// =============================

// Elements
const status = document.getElementById("status");
const details = document.getElementById("details");
const nameText = document.getElementById("name");
const timeText = document.getElementById("time");
const actionText = document.getElementById("action");

// Get the information saved by index.js
const name = localStorage.getItem("lastName");
const action = localStorage.getItem("lastAction");
const time = localStorage.getItem("lastTime");

// If someone opens home.html directly
if (!name || !action || !time) {
    window.location.replace("index.html");
}

// Show attendance details
status.innerHTML = "✅ Attendance Recorded";
details.style.display = "block";

nameText.innerHTML = name;
timeText.innerHTML = "🕒 " + time;

if (action === "IN") {
    actionText.innerHTML = "☀️ Signed In";
} else {
    actionText.innerHTML = "🏠 Signed Out";
}

// After 3 seconds, clear the screen
setTimeout(() => {

    status.innerHTML = "Ready for the next scan.";
    details.style.display = "none";

    // Clear stored values
    localStorage.removeItem("lastName");
    localStorage.removeItem("lastAction");
    localStorage.removeItem("lastTime");

}, 3000);

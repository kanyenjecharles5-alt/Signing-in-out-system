// =============================
// Google Apps Script URL
// =============================

const scriptURL = "https://script.google.com/macros/s/AKfycbxEtYoy0YEN-Iyvg5Uu87jiLpeV6gXuGOJnSeL8gSF57EIgYSUhwlQ771tijrdwdCyGhA/exec";

// =============================
// Token
// =============================

const token = localStorage.getItem("token");
// ======================================
// Prevent attendance loop
// ======================================

if (sessionStorage.getItem("attendanceDone") === "true") {

    sessionStorage.removeItem("attendanceDone");

    document.getElementById("welcome").innerHTML =
        "✅ Attendance Recorded";

    document.getElementById("statusMessage").innerHTML =
        "You can now close this page and scan the QR again later.";

    // Stop the script from recording attendance again
    throw new Error("Attendance already processed");

}

if(!token){

    window.location.href="register.html";

}

const welcome=document.getElementById("welcome");
const status=document.getElementById("statusMessage");

const popup=document.getElementById("popup");
const popupIcon=document.getElementById("popupIcon");
const popupTitle=document.getElementById("popupTitle");
const popupMessage=document.getElementById("popupMessage");

// =============================

function greeting(){

    const h=new Date().getHours();

    if(h<12) return "Good Morning ☀️";

    if(h<17) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";

}

// =============================

function showPopup(icon, title, message){

    popupIcon.innerHTML = icon;
    popupTitle.innerHTML = title;
    popupMessage.innerHTML = message;

    popup.style.display = "flex";

    // Tell the next page load not to record attendance again
    sessionStorage.setItem("attendanceDone", "true");

    setTimeout(() => {
        window.location.replace("home.html");
    }, 300);

}


}

// =============================

function recordAttendance(action){

    fetch(scriptURL,{

        method:"POST",

        body:JSON.stringify({

            request:"attendance",

            token:token,

            action:action

        })

    })

    .then(r=>r.json())

    .then(data=>{

        if(!data.success){

            status.innerHTML="Unable to record attendance.";

            return;

        }

        if(action==="IN"){

            showPopup(

                "☀️",

                "Attendance Recorded!",

                "Have a great day! 😊<br><br>Go inspire those kids."

            );

        }else{

            showPopup(

                "🎉",

                "GO HOME!!",

                "😂 You've survived another day surrounded by kids.<br><br>😄 Rest abi.<br><br>See you tomorrow ❤️"

            );

        }

    });

}

// =============================

fetch(scriptURL,{

method:"POST",

body:JSON.stringify({

request:"checkStatus",

token:token

})

})

.then(r=>r.json())

.then(data=>{

if(!data.success){

localStorage.removeItem("token");

window.location.href="register.html";

return;

}

welcome.innerHTML=`👋 ${greeting()}, <strong>${data.name}</strong>`;

status.innerHTML="Checking attendance...";

setTimeout(()=>{

recordAttendance(data.nextAction);

},300);

})

.catch(()=>{

status.innerHTML="Unable to connect.";

});

const status=document.getElementById("status");
const details=document.getElementById("details");

const name=document.getElementById("name");
const time=document.getElementById("time");
const action=document.getElementById("action");

const lastName=sessionStorage.getItem("lastName");
const lastAction=sessionStorage.getItem("lastAction");

status.innerHTML="✅ Attendance Recorded";

details.style.display="block";

name.innerHTML=lastName || "";

time.innerHTML="🕒 "+new Date().toLocaleTimeString();

if(lastAction==="IN"){

    action.innerHTML="☀️ Signed In";

}else{

    action.innerHTML="🏠 Signed Out";

}

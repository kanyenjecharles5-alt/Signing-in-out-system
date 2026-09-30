const scriptURL = "https://script.google.com/macros/s/AKfycbzzE0boOzPQg-D25RBhOMTJsiqba6ffhW-AmMuSE2Kr2X3mkvxmVba2vza7ZQ2yW_BPvQ/exec";

const token = localStorage.getItem("token");

if(!token){

    window.location.replace("register.html");

}

const welcome=document.getElementById("welcome");
const status=document.getElementById("statusMessage");

function greeting(){

    const h=new Date().getHours();

    if(h<12) return "Good Morning ☀️";
    if(h<17) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";

}

fetch(scriptURL,{

    method:"POST",

    body:JSON.stringify({

        request:"checkStatus",
        token

    })

})

.then(r=>r.json())

.then(data=>{

    if(!data.success){

        localStorage.removeItem("token");

        window.location.replace("register.html");

        return;

    }

    welcome.innerHTML=`👋 ${greeting()}, <strong>${data.name}</strong>`;

    status.innerHTML="Recording attendance...";

    return fetch(scriptURL,{

        method:"POST",

        body:JSON.stringify({

            request:"attendance",

            token,

            action:data.nextAction

        })

    })

    .then(r=>r.json())

    .then(result=>{

        if(!result.success){

            status.innerHTML="Unable to record attendance.";

            return;

        }

        sessionStorage.setItem("lastName",data.name);
        sessionStorage.setItem("lastAction",data.nextAction);

        window.location.replace("home.html");

    });

})

.catch(err=>{

    console.error(err);

    status.innerHTML="Unable to connect.";

});

const scriptURL = "https://script.google.com/macros/s/AKfycbzzE0boOzPQg-D25RBhOMTJsiqba6ffhW-AmMuSE2Kr2X3mkvxmVba2vza7ZQ2yW_BPvQ/exec";

const token = localStorage.getItem("token");

const status = document.getElementById("status");

const details = document.getElementById("details");

const nameText = document.getElementById("name");

const timeText = document.getElementById("time");

const actionText = document.getElementById("action");

if(!token){

    window.location.href="register.html";

}

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

    fetch(scriptURL,{

        method:"POST",

        body:JSON.stringify({

            request:"attendance",

            token:token,

            action:data.nextAction

        })

    })

    .then(r=>r.json())

    .then(result=>{

        if(result.success){

            status.innerHTML="✅ Attendance Recorded";

            details.style.display="block";

            nameText.innerHTML=data.name;

            timeText.innerHTML="🕒 "+new Date().toLocaleTimeString();

            if(data.nextAction=="IN"){

                actionText.innerHTML="☀️ Signed In";

            }else{

                actionText.innerHTML="🏠 Signed Out";

            }

            setTimeout(()=>{

                status.innerHTML="Ready for the next scan.";

                details.style.display="none";

            },800);

        }

    });

});
const scriptURL = "https://script.google.com/macros/s/AKfycbzzE0boOzPQg-D25RBhOMTJsiqba6ffhW-AmMuSE2Kr2X3mkvxmVba2vza7ZQ2yW_BPvQ/exec";

const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pin = document.getElementById("pin").value.trim();

    if(pin.length !== 4 || isNaN(pin)){
        alert("PIN must be exactly 4 digits.");
        return;
    }

    fetch(scriptURL,{
        method:"POST",
        body:JSON.stringify({
            request:"register",
            name,
            email,
            pin
        })
    })

    .then(r=>r.json())

    .then(data=>{

        if(!data.success){
            alert("Registration failed.");
            return;
        }

        localStorage.setItem("token",data.token);

        // First attendance happens here
        window.location.replace("index.html");

    })

    .catch(err=>{

        console.error(err);
        alert("Unable to register.");

    });

});

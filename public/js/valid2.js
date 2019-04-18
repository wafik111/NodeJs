let password = document.getElementById("password"),
    login = document.getElementById("login"),
    div = document.getElementById("div");


login.onclick = (event)=>{
    if(password.value.length < 6 ){
        event.preventDefault();
        div.innerHTML = "<p class='alert alert-danger'> password must be more than 6 characters </p>"


    }
}
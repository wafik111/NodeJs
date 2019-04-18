pass1 = document.getElementById("pass1");
pass2 = document.getElementById("pass2");
age = document.getElementById("age");
register = document.getElementById("register");
let div = document.getElementById("div"),
    div2 = document.getElementById("div2"),
    ajax = new XMLHttpRequest(),
    mail = document.getElementsByName("userMail")[0];
    span = document.getElementById("span");
  

mail.onblur = function(){
    ajax.open("POST","http://localhost:8080/check/"+this.value);
    ajax.send();
    ajax.onreadystatechange = ()=>{
        if(ajax.readyState === 4 && ajax.status === 200){
            response = JSON.parse(ajax.responseText);
            if(response['msg'] == "ok")
            span.innerHTML = "<p class='alert alert-danger'> This email is used ...</p>";
            else
            span.innerHTML = "<p class='alert alert-success'> This email is valid </p>";


            
        }
}
}




function matchPassword (event){
    if (pass1.value !== pass2.value){
        div2.innerHTML = "<p class='alert alert-primary'> password didnt match </p>"
        event.preventDefault();
    }
}

function passwordValid(){
    if(pass1.value.length < 6 ){
        event.preventDefault();
        div.innerHTML = "<p class='alert alert-danger'> password must be more than 6 characters </p>"
    }
    else
    div.innerHTML = ""

}

register.onclick = (event)=>{
   matchPassword(event);
   passwordValid(event);
   
}

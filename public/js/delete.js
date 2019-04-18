
let table = document.getElementsByTagName("table")[0],
    ajax = new XMLHttpRequest();

table.onclick = function(event){
    if(event.target.tagName=="BUTTON"){
        row = event.target.parentElement.parentElement;
        ajax.open("POST","http://localhost:8080/events/delete/"+ event.target.id);
        ajax.send();
        ajax.onreadystatechange = ()=>{
            if(ajax.readyState === 4 && ajax.status === 200){
                response = JSON.parse(ajax.responseText);
                console.log(response);
                if(response['msg']== "done")
                row.remove();
            }
        }
        
    }
}
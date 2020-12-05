let insertion = document.getElementById('insert');

insertion.addEventListener('submit',function(event){
    event.preventDefault();
    
    let req = new XMLHttpRequest();
    let data = "name="+insertion.elements.name.value+ "&reps="+insertion.elements.reps.value+"&weight="+insertion.elements.weight.value+"&date="+insertion.elements.weight.value+"&lbs="+insertion.elements.lbs.value;
    
    req.open("GET", "/insert?" + data, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400){
            let received = JSON.parse(req.responseText);
            let id = received.routine;
            let table = document.getElementById('content');
            let new_row = table.insertRow(-1);
            let td_info = [insertion.elements.name.value, insertion.elements.reps.value, insertion.elements.weight.value, insertion.elements.date.value, insertion.elements.lbs.value]
            for (let i = 0; i < 5; i++) {
                let addition = document.createElement('td');
                addition.textContent = td_info[i]
                new_row.appendChild(addition);
            }
            let options = document.createElement('td');
            let deletion = document.createElement('input');
            let editor = document.createElement('a');
            editor.setAttribute('href', '/edit?id=' + id);
            editor.textContent = "Edit";
            deletion.setAttribute('type', 'button');
            deletion.setAttribute('value', 'Delete');
            deletion.setAttribute('onClick', 'deleteRow(' + id + ')');
            options.appendChild(deletion);
            options.appendChild(editor);
            new_row.appendChild(options);
        } else {
            console.log("There was an error, idiot.");
        } 
    });
    req.send("/insert?" + data);
});

function deleteRow(id) {
    let match = id.toString();
    let to_delete = document.getElementById(match);
    to_delete.parentNode.removeChild(to_delete);

    let req = new XMLHttpRequest();

    req.open("GET", "/delete?id=" + id, true);

    req.addEventListener("load", function(){
        if(req.status >= 200 && req.status < 400) {
            console.log("successful deletion");
        } else {
            console.log("there was an error, idiot.");
        }
    });

    req.send("/delete?id=" + id);
}
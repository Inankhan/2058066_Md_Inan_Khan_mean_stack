let items = [];

function addNewBudget(){
    console.log("inside the function");

    let client_name = document.getElementById("ClientName").value;
    let project_name = document.getElementById("ProjectName").value;
    let budget = document.getElementById("budget").value;

    let row = {client:client_name, project:project_name, budget:budget};
    items.push(row);
    localStorage.setItem("obj1", JSON.stringify(items));

}


function display(){
    let rows = JSON.parse(localStorage.getItem("obj1"));    
    let table = document.getElementById("displayTable");

    for(let i = 0; i < rows.length; i++){
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML= rows[i].client;
    cell2.innerHTML= rows[i].project;
    cell3.innerHTML= rows[i].budget;
    }

}


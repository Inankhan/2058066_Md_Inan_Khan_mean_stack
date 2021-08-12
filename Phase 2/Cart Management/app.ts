let all_items = [];
let cart_size = 0;
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
function addComputer(){
    let item = {name:'Computer', price:1000}
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));

    updateCartSize();
}

function addBicycle(){
    let item = {name:'Bicycle', price:200}
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));

    updateCartSize();
}

function addCar(){
    let item = {name:'Car', price:10000}
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));

    updateCartSize();   
}

function addTV(){
    let item = {name:'TV', price:500}
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));

    updateCartSize();
}


function updateCartSize(){
    cart_size = JSON.parse(localStorage.getItem("items")).length;
    let cart_size_DOM = document.getElementById("cart_size")
    cart_size_DOM.innerText = `${cart_size}`;
}


function display(){
    let sum:number = 0;
    let rows = JSON.parse(localStorage.getItem("items"));    
    let table = document.getElementById("table_display");

    for(let i = 0; i < rows.length; i++){
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    cell1.innerHTML= rows[i].name;
    cell2.innerHTML= formatter.format(rows[i].price);
    sum+=rows[i].price;
    }

    let display_total = document.getElementById('total')
    display_total.innerText = `Total Price: ${formatter.format(sum)}`;
}
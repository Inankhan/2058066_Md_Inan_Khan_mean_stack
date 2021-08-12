var all_items = [];
var cart_size = 0;
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
function addComputer() {
    var item = { name: 'Computer', price: 1000 };
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));
    updateCartSize();
}
function addBicycle() {
    var item = { name: 'Bicycle', price: 200 };
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));
    updateCartSize();
}
function addCar() {
    var item = { name: 'Car', price: 10000 };
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));
    updateCartSize();
}
function addTV() {
    var item = { name: 'TV', price: 500 };
    all_items.push(item);
    localStorage.setItem("items", JSON.stringify(all_items));
    updateCartSize();
}
function updateCartSize() {
    cart_size = JSON.parse(localStorage.getItem("items")).length;
    var cart_size_DOM = document.getElementById("cart_size");
    cart_size_DOM.innerText = "" + cart_size;
}
function display() {
    var sum = 0;
    var rows = JSON.parse(localStorage.getItem("items"));
    var table = document.getElementById("table_display");
    for (var i = 0; i < rows.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = rows[i].name;
        cell2.innerHTML = formatter.format(rows[i].price);
        sum += rows[i].price;
    }
    var display_total = document.getElementById('total');
    display_total.innerText = "Total Price: " + formatter.format(sum);
}

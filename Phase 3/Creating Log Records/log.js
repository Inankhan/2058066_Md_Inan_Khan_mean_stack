const { debug } = require('console');
let fs = require('fs');
let readline = require('readline-sync');
let users = JSON.parse(fs.readFileSync("users.json").toString());
let stop = "";

debug();

while (stop != 'q'){
stop = "";
populateFile();
stop = readline.question("Enter q to stop populating the file, otherwise press any key:")
}

function populateFile(){
    let first = readline.question("Enter the first name:")
    let last = readline.question("Enter the last name:");
    let gender = readline.question("Enter the gender:")
    let email = readline.questionEMail("Enter your email:")
    debug();
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let currentDateAndTime = `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`
    debug();
    let obj = {firstName:first, lastName:last, gender:gender, email:email, timeRecordInserted:currentDateAndTime }
    users.push(obj)
    let usersString = JSON.stringify(users);
    fs.writeFileSync("users.json",usersString);
}


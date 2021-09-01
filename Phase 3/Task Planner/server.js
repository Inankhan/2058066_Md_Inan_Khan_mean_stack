let fs = require('fs');
let tasks = JSON.parse(fs.readFileSync("tasks.json").toString());

let http = require("http");
let url = require("url");

function populateTable(){
    let rows = ``;
    for (let i = 0; i < tasks.length; i++) {
        rows+=`<tr>
                <td>${tasks[i].empID}</td>
                <td>${tasks[i].taskID}</td>
                <td>${tasks[i].task}</td>
                <td>${tasks[i].deadline}</td>
                </tr>
        `
    }

    return rows;
    
}

let onlyPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Planner</title>
    <script src="server.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container">
        <br>
        <h2>Task Planner</h2>
        <br>
        <form action="addTask">
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Employee ID:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="empID" required>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Task ID:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="taskID" required>
              </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Task:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="task" required>
                </div>
            </div>
            
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Deadline:</label>
                <div class="col-sm-10">
                  <input type="date" class="form-control" name="deadline" required>
                </div>
            </div>
            <br>

            <button type="submit" class="btn btn-success">Add Task</button>
            
            
        </form>
        <br>
        <br>
        <form action="deleteTask">
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Task ID:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" required name="taskID">
              </div>
            </div>

            <button type="submit" class="btn btn-danger">Delete Task</button>
        </form>

        <br>
        <hr>
        <br>
        <h2>All Tasks</h2>
        <br>
        <a href="list" class="btn btn-primary">List all tasks</a>
        <br>
    </div>

    
</body>
</html>
`



let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path == "/"){
            response.write(onlyPage);
        } 
        else if(urlInfo.pathname == "/addTask"){
            let newTask = urlInfo.query;
            let checkTaskID = tasks.find(task=>task.taskID == newTask.taskID);

            response.writeHead(200,{"content-type":"text/html"});

            if(checkTaskID== undefined){
                tasks.push(newTask);
                let tasksString = JSON.stringify(tasks);
                fs.writeFileSync("tasks.json",tasksString);
                response.write(`<br><div class = "container">Task added successfully </div>`);
                response.write(onlyPage);
            }
            else{
                response.write(`<br><div class = "container">Please insert a different Task ID, that one is already taken.</div>`)
                response.write(onlyPage);
            }
        }
        else if(urlInfo.pathname == "/deleteTask"){
            let task = urlInfo.query;
            let checkTaskID = tasks.find(t=>t.taskID == task.taskID);
            response.writeHead(200,{"content-type":"text/html"});

            if(checkTaskID== undefined){
                response.write(`<br><div class = "container">Sorry, the task ID you have entered does not exist. Please enter a different ID.</div>`)
                response.write(onlyPage)
            }
            else{
                tasks = tasks.filter(function( task ) {
                    return task.taskID !== checkTaskID.taskID;
                  });
                let tasksString = JSON.stringify(tasks);
                fs.writeFileSync("tasks.json",tasksString);
                response.write(`<br><div class = "container">Task deleted successfully.</div>`)
                response.write(onlyPage)
            }

        }
        else if(urlInfo.pathname == "/list"){
            let rows = populateTable();
            response.writeHead(200,{"content-type":"text/html"});
            response.write(onlyPage)
            response.write(`<br><div class = "container"><table class="table"> 
            <tr><th>Employee ID</th> <th>Task ID</th> <th>Task</th> <th>Deadline</th> </tr>
            
            ${rows} </table> </div>`);
        }
    }
    response.end();
})


server.listen(9090,()=>console.log("Server running on port number 9090"))
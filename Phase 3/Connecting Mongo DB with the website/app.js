let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json())

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsmean";
mongoose.pluralize(null);   
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

let courseSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    amount: Number
});

let courseModel = mongoose.model("Courses",courseSchema);


function populateTable(tasks){
    let rows = ``;
    for (let i = 0; i < tasks.length; i++) {
        rows+=`<tr>
                <td>${tasks[i]._id}</td>
                <td>${tasks[i].name}</td>
                <td>${tasks[i].description}</td>
                <td>${tasks[i].amount}</td>
                </tr>
        `
    }

    return rows;
    
}



app.get("/",(request,response)=> {
    response.sendFile(__dirname+"/index.html");
})

app.get("/add",(request,response)=> {
    if(request.query.id == undefined){
        response.sendFile(__dirname+"/add.html");
    }
    else{
        let courseInfo = request.query;
        let course = new courseModel({_id: parseInt(courseInfo.id), name: courseInfo.name, description: courseInfo.description, amount:parseInt(courseInfo.amount)})        
        courseModel.insertMany(course,(err,result)=> {
            if(!err){
                    response.send("Record stored successfully")
            }else {
                    response.send(err);
            }
        })
    }

})

app.get("/update",(request,response)=> {
    if(request.query.id == undefined){
        response.sendFile(__dirname+"/update.html");
    }
    else{
        let course = request.query;
        courseModel.updateOne({_id:course.id},{$set:{amount:course.amount}},(err,result)=> {
            if(!err){
                response.send('Course updated successfully');
            }else {
                response.send(err);
            }
        })
    }

})

app.get("/delete",(request,response)=> {

    if(request.query.id == undefined){
        response.sendFile(__dirname+"/delete.html");
    }
    else{
        let id = request.query.id;
        courseModel.deleteOne({_id:id},(err,result)=> {
            if(!err){
                response.send("Course deleted successfully")
            }else {
                response.send(err);
            }
        })
    }

})

let fetchFileTop = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show Courses</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</head>
<body>
    <div>
        <h4>All Courses</h4>

       
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Home</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              
              <a class="nav-link" href="add">Add Course</a>
              <a class="nav-link" href="update">Update Course</a>
              <a class="nav-link" href="delete">Delete Course</a>
              <a class="nav-link" href="fetch">Fetch Courses</a>
            </div>
          </div>
        </div>
      </nav>
      <div class="container">
      <br>
      <br>

`

let fetchFileBottom = `
    </div>
    </body>
    </html>
`

app.get("/fetch",(request,response)=> {
    courseModel.find({},(err,data)=> {
        if(!err){
           let rows = populateTable(data);
           response.send(`
           ${fetchFileTop}
           <table class="table">
           <tr>
           <th>ID</th> 
           <th>Name</th>
           <th>Description</th>
           <th>Amount</th>
           </tr>
           ${rows} 
           </table>
           ${fetchFileBottom}`);
        }else {
             response.json(err);   
        }
    })
    
})


app.listen(9090,()=>console.log("Server running on port number 9090"))

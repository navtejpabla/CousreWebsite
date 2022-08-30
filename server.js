const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "N@vtej2000",
  database: "node.js"
})

connection.connect(function(error){
  if (error) throw error;
  else console.log("Connection to Database successful...");
})
const express = require("express");
const app = express();


const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

app.set('view-engine', 'ejs');


app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + ("/public/Project.html"));
});

app.post("/", encoder, function(req, res){
  var username = req.body.email;
  var password = req.body.password;

  connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username, password], function(error, results, fields){
    if (results.length > 0){
      res.redirect("welcome.html");
    } else{
      res.redirect("public/SignIn.html");
    }
    res.end();
  })
});

app.get("welcome.html", function(req, res){
  res.sendFile(__dirname+"welcome.html");
})



app.listen(3000);

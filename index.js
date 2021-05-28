const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors');

app.use(cors());

const todoRoutes = require("./database/routes/todo.js");
app.use(express.static(__dirname + "/dist"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req,res) => {
  res.sendFile("index.html");
})

app.use("/api/todos", todoRoutes);



app.listen("3000", function(){
  console.log("Server is running");
})
const express = require("express");
const router = express.Router();

const db = require("../index.js");

router.get("/", (req,res) => {
  db.Todo.find()
    .then(data => res.json(data))
    .catch(error => res.send(error))
});

router.post("/", (req,res) => {
  db.Todo.create(req.body)
    .then(newTodo => res.status(200).json(newTodo))
    .catch(err => res.send(err));
});

router.delete("/:todoId", (req,res) =>{
  db.Todo.remove({_id: req.params.todoId})
    .then( () => res.json({message: "Yes, this shit was deleted"}))
    .catch(err => res.send(err));
});


module.exports = router;
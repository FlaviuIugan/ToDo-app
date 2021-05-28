import { updateLocale } from "moment";
import "../style/style.scss";
const moment = require("moment");
const axios = require("axios");

const ul = document.querySelector(".lista");
const userInput = document.querySelector(".user-input");



function clearField(){
  return userInput.value = "";
}



window.addEventListener("load", getData("http://localhost:3000/api/todos"));

function getData(URL){

  fetch(URL).then(response => response.json()).then(data => {
      
      data.forEach(element => {

      const li = document.createElement("li");
      li.setAttribute("class", "list-group-item");
      li.setAttribute("id", `${element._id}`)

      li.innerHTML = `<div class="todo-indicator bg-warning"></div>
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left mr-2">
                            <div class="custom-checkbox custom-control">
                              <input
                                class="custom-control-input"
                                id="exampleCustomCheckbox12"
                                type="checkbox"
                              /><label
                                class="custom-control-label"
                                for="exampleCustomCheckbox12"
                                >&nbsp;</label
                              >
                            </div>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                                ${element.name}
                            </div>
                            <div class="widget-subheading"><i>Date</i></div>
                          </div>
                          <div class="widget-content-right">
                            <button
                              class="done
                                border-0
                                btn-transition btn btn-outline-success
                              "
                            >
                              <i class="fa fa-check"></i>
                            </button>
                            <button
                              class="
                                gunoi
                                border-0
                                btn-transition btn btn-outline-danger
                              "
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>`;
                      
                      ul.appendChild(li);    
                   })
        toogleLi();
        deleteTodo();
            
  }).catch(function(err){console.log(err)});
};

// function togleBadge(){
//       const liInput = document.querySelectorAll(".li-input");
//     liInput.forEach(element => {
//       element.classList.remove("badge-danger");
//       element.classList.add("badge-succes");
//     });
// }


function toogleLi(){
  const li = document.querySelectorAll("li")
  li.forEach(element => {  element.addEventListener("click", function(){
    element.classList.toggle("litoggle");

  })})

  
  }




  // element.setAttribute("class", "badge badge-success")


function deleteTodo(){
  const gunoi = document.querySelectorAll(".gunoi");
  gunoi.forEach(element => {
    element.addEventListener("click", function(){
       element.parentElement.parentElement.parentElement.parentElement.remove()
       const ID = element.parentElement.parentElement.parentElement.parentElement.id;
       console.log(ID);
       axios.delete(`http://localhost:3000/api/todos/${ID}`).then(res => console.log("Succes"));
      
    });
  })

}



userInput.addEventListener("keypress", function(e){
  const inputValue = userInput.value;
  if(e.which === 13){
    
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerHTML = `<div class="todo-indicator bg-warning"></div>
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left mr-2">
                            <div class="custom-checkbox custom-control">
                              <input
                                class="custom-control-input"
                                id="exampleCustomCheckbox12"
                                type="checkbox"
                              /><label
                                class="custom-control-label"
                                for="exampleCustomCheckbox12"
                                >&nbsp;</label
                              >
                            </div>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                                ${inputValue}
                            </div>
                            <div class="widget-subheading"><i>Date</i></div>
                          </div>
                          <div class="widget-content-right">
                            <button
                              class="done
                                border-0
                                btn-transition btn btn-outline-success
                              "
                            >
                              <i class="fa fa-check"></i>
                            </button>
                            <button
                              class="
                                gunoi
                                border-0
                                btn-transition btn btn-outline-danger
                              "
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>`;

    
    ul.appendChild(li);
    console.log(li);

    toogleLi();
    deleteTodo();

    axios.post('http://localhost:3000/api/todos', {
    name: `${userInput.value}`,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

      clearField();
  }


})

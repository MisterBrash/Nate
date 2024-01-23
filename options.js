'use strict'

//Global variables
let timelimit;
let targetradius;
let maxobjects;

function selection() {
  //Get value selected in the options drop down
  let timeLimitValue = document.getElementById("timelimit_options").value;
  let targetRadiusValue = document.getElementById("targetsize_options").value;
  let maxObjectsValue = document.getElementById("maxobjects_options").value;

  if (timeLimitValue == "option1") {
    timelimit = "1";
  }
  else if (timeLimitValue === "option2") {
    timelimit = "2";
  }
  else if (timeLimitValue === "option3") {
    timelimit = "3";
  }
  else if (timeLimitValue === "option4") {
    timelimit = "4";
  }
  else if (timeLimitValue === "option5") {
    timelimit = "5";
  }
  else {
    timelimit = "1";
  }

  if (targetRadiusValue == "option1") {
    targetradius = "10px";
  }
  else if (targetRadiusValue === "option2") {
    targetradius = "20px";
  }
  else if (targetRadiusValue === "option3") {
    targetradius = "30px";
  }
  else if (targetRadiusValue === "option4") {
    targetradius = "20px";
  }
  else if (targetRadiusValue === "option5") {
    targetradius = "50px";
  }
  else {
    targetradius = "20px";
  }

  if (maxObjectsValue == "option1") {
    maxobjects = "1";
  }
  else if (maxObjectsValue === "option2") {
    maxobjects = "3";
  }
  else if (maxObjectsValue === "option3") {
    maxobjects = "5";
  }
  else if (maxObjectsValue === "option4") {
    maxobjects = "7";
  }
  else if (maxObjectsValue === "option5") {
    maxobjects = "10";
  }
  else {
    maxobjects = "5";
  }
}

function saveSelection(event, dropdownId) {
  //Prevent default form submission behaviour
  event.preventDefault();

  let selectedValue = document.getElementById(dropdownId).value;

  //Save selected value to local storage
  localStorage.setItem(dropdownId, selectedValue);
}

document.getElementById('menu').addEventListener('click', menu)

function menu() {

  let timelimit = localStorage.getItem('timelimit_options');
  let targetradius = localStorage.getItem('targetsize_options');
  let maxobjects = localStorage.getItem('maxobjects_options');
  
  localStorage.setItem("timelimit", timelimit)
  localStorage.setItem("targetsize", targetradius)
  localStorage.setItem("maxobjects", maxobjects)
  window.location.href = 'index.html'
}
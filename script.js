'use strict';

/**
 * ICS3UC Final Project S1 2023-24
 * 
 * Author: Nathaniel Brennan-Lee
 * Description: An aim trainer with a random spawning mechanic and scoring.
 * 
 */

//Reference the canvas and its context
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

//Interval in milliseconds between object spawns
let spawnRate = 200;

//Radius of pixels in the arc
let targetRadius = 20;

//Stats Variables
let score = 0;
let hits = 0;
let misses = 0;
let total_clicks = 0;
let accuracy = 0;

//Stores all spawned objects in an array. When objects are removed or added to the array, it is translated to the canvas.
let objects = []

//Maximum number of objects allowed to be in the objects[] array.
let maxObjects = 5;

//Limit of invalid spawn attempts for objects. Prevents browser freezing and/or crashing.
let maxSpawnAttempts;

//Variable representing the TIME the last object was spawned. Will be updated further down in the code.
let lastSpawn = 0

//Save the starting time to the exact moment the page loads. This will be used to calculate elapsed time for spawning intervals.
let startTime = Date.now()

//Event listeners
window.addEventListener("load", canvas_resize)
window.addEventListener("resize", canvas_resize)
document.getElementById("canvas").addEventListener("click", clickregister);
document.addEventListener("mousemove", custom_crosshair_pos)

function custom_crosshair_pos(e) {
  let cursor = document.querySelector('.crosshair');
  //Make updates to the left and top positions of the cursor/crosshair
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
}

//Resize the canvas each time the user resizes the window
function canvas_resize(e) {
  //Width determined by height to preserve 1:1 aspect ratio
  canvas.width = window.innerHeight - 300;
  canvas.height = window.innerHeight - 300;
}

let timeLimit_MINS = 1;

let remaining_time = 60 * timeLimit_MINS;

function timer() {

  if (remaining_time == 0) {
    clearInterval(timeoutID);
    game_end();
  }

  else {
    document.getElementById("time_remaining").textContent = remaining_time;
    remaining_time--;
  }
}

//Function that creates a continuously running animation loop throughout the canvas
animate();

let timeoutID = setInterval(timer, 1000)

function animate() {
  //Obtain the elapsed time from the page load until now
  let time = Date.now()

  //Check if it is time to spawn an object
  if (time > (lastSpawn + spawnRate)) {
    //Set the last spawn variable to the current time
    lastSpawn = time;
    if (objects.length < maxObjects) {
      //Function that determines an appropriate spawning location for the object.
      spawnRandomObject()
    }
  }

  //Request another animation frame
  requestAnimationFrame(animate);

  //Clear the canvas for objects to be redrawn in new positions
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Generate the physical representation of the object on the canvas
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i]

    //If the object is within the canvas boundaries
    if (object.x < canvas.width + targetRadius && object.x > targetRadius && object.y < canvas.height + targetRadius && object.y > targetRadius) {

      //Draw the arc on the canvas that represents the target
      ctx.beginPath();

      //Create an arc with (x coordinate, y coordinate, radius, start angle (should be zero), end angle (end of the arc in radians))
      ctx.arc(object.x, object.y, targetRadius, 0, 2 * Math.PI);
      ctx.closePath();

      //Set the color fillstyle (I used the Valorant color scheme)
      let color = "#f63e57";
      ctx.fillStyle = color;
      ctx.fill();
    }

    else {
      //Splice (remove) ONE object at the position "i" in the obects array if the object is outside of the canvas boundaries
      objects.splice(i, 1);
    }
  }
}

function spawnRandomObject() {

  //Randomly generate two temporary x and y coordinates to determine whether or not it is viable with the given spawning parameters
  let tempX = Math.random() * (canvas.width - 2 * targetRadius) + targetRadius;
  let tempY = Math.random() * (canvas.height - 2 * targetRadius) + targetRadius;


  //Set a random type for this new object
  let t;

  let nonIntersecting = false;

  //Count the failed spawn attempts
  let failedSpawnAttempts = 0;

  let spawnFailed;

  //While loop to check whether or not the tempX and tempY coordinates intersect existing targets: It will index through the array of objects, calculate the distance between the objects and the temp coords and then change the nonIntersecting boolean depending on the case
  while (!nonIntersecting) {

    nonIntersecting = true;

    for (let i = 0; i < objects.length; i++) {
      let distance = Math.sqrt((objects[i].x - tempX) ** 2 + (objects[i].y - tempY) ** 2);

      if (distance < 2 * targetRadius) {
        failedSpawnAttempts++;
        nonIntersecting = false;
      }
    }

    if (failedSpawnAttempts >= maxSpawnAttempts) {
      spawnFailed = true;
      //Break out of the while loop
      break;
    }

    if (!nonIntersecting) {
      //Note, the tempX and Y have an additional set of rules to prevent objects from clipping outside the canvas
      tempX = Math.random() * (canvas.width - 2 * targetRadius) + targetRadius;
      tempY = Math.random() * (canvas.height - 2 * targetRadius) + targetRadius;
    }

  }

  if (!spawnFailed) {
    //Create new object
    let object = {
      //Set the object type
      type: t,
      //Set the x of the object to equal the temp X and temp Y now that they have been checked for intersection
      x: tempX,

      y: tempY,
    }

    //Add this new object to the objects[] array
    objects.push(object);

  }
}

function clickregister(e) {

  total_clicks++

  //Store the position of the canvas
  let rect = canvas.getBoundingClientRect();

  //Calculate the coordinates of the mouse click, store them in the mouseX and Y variables 
  let mouseX = Math.round(e.clientX - rect.left);
  let mouseY = Math.round(e.clientY - rect.top);

  //Log in the console just for the silly purposes of checking
  console.log("click")

  for (let j = 0; j < objects.length; j++) {
    //Calculate distance using pythagorean theorem between each object in the array and the mouse click location
    let distance = Math.sqrt((objects[j].x - mouseX) ** 2 + (objects[j].y - mouseY) ** 2);

    //Remove one object at that index (j) if the mouse click location intersects a target
    if (distance < targetRadius) {
      objects.splice(j, 1);
      score = score + 10
      hits++
      document.getElementById("score").textContent = score;
      document.getElementById("hits").textContent = hits;
    }

    else {
      misses++
      accuracy = Math.round((hits / total_clicks) * 100) * 10 / 10
      document.getElementById("accuracy").textContent = accuracy;
    }
  }
}

function game_end() {
  localStorage.setItem("score", score)
  localStorage.setItem("accuracy", accuracy)
  localStorage.setItem("hits", hits)
  window.location.href = 'postgame.html'
}
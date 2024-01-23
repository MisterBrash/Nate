Aim Trainer:

<h1>Game Window</h1>

Canvas size: `480px, 480px`

<h2>Global Variables:</h2>

- **Spawn Rate
<br>_Interval in milliseconds between object spawns._</br>

- Target Radius
<br>_Radius in pixels of the arc_</br>

- Objects[] (array)
<br>_Stores all spawned objects in an array_</br>

- Maximum Objects
<br>_Number of objects allowed to be in the objects[] array._</br>

- Maximum Spawn Attempts
<br>Limit of invalid spawn attempts for objects.</br>

- Last Spawn
<br>_Variable representing when the last object was spawned_</br>

- Start Time 
<br>_Variable to save the start time. Used to calculate elapsed time_</br>

<h2>Event Listeners</h2>

- A click will call the "clickregister" function.
- Resizing the canvas will call the canvas resize function.
- Loading will also call the canvas resize function.

<h2>Target Spawning</h2>

<h3>Function: Animate</h3>

1: Determine whether or not to spawn an object.
<br></br>
2: If it is time, call a function to determine the spawn location of an object.
<br></br>
3: Request an animation frame
<br></br>
4: Clear the canvas for redrawing
<br></br>
5: Generate a target using a for loop, indexing the number of objects in the array and filling with ctx.arc
<br></br>
6: Clear the canvas so all objects can be redrawn.
<br></br>
7: Index the array from start to end.
8: If an object in the objects array meets ALL the required parameters, ctx.arc with the radius variable and coordinates.
9: In any other case, splice an object from the array.

<h3>Function: Spawn Random Object</h3>

1: Temporarily select a random location on the canvas to determine whether or not it is viable given spawning parameters. Set these locations as a variable tempX and tempY.

2: Check if an object will clip into another object. This will be achieved by the following method:

- Set a "not intersecting" boolean to false.
- Set a variable to count the number of failed spawn attempts (update if the temporary x and y do not follow the parameters to spawn)
<br></br>
- **WHILE LOOP**: While NOT non intersecting, set "not intersecting" to true.
<br></br>
- **FOR LOOP**: A for loop will then index the objects array. It will use PYTHAGOREAN THEOREM to find the distance between the center of all circles (arcs) and the temporary x and y variables.
<br></br>
- **IF STATEMENT**: If the distance is smaller than the target radius, do the following:
  - Add one to the 'failed spawn attempts' variable.
  - Set the 'not intersecting' variable to false.
<br></br>

3: In order to prevent crashing, we will use the 'failed spawn attempts' and 'max spawn attempts' variables.

- **IF STATEMENT**: If the number of failed spawn attempts is greater than or equal to the maximum number of allowed spawn attempts, do the following:
  - Set the spawn failed boolean to true
  - Break out of the while loop "break;"

- **IF STATEMENT**: If nonIntersecting boolean is false:
  - Set a new random temporary x and y

- **IF STATEMENT**: If spawn failed is true:
  - Create a new object with the tempX and tempY now set as the x and y of the object.
  - Add this object to the objects array.

<h3>Function: Canvas Resize</h3>

Adjust the height and width of the canvas based on the size of the user's window. In order to maintain 1:1 aspect ratio, canvas width will be based on the height value.

<h3>Function: Click Register</h3>

1: Get the location of the click.

2: Use a for loop to go through the objects array. Check if the mouse position collides with any objects by using pythagorean theorem.
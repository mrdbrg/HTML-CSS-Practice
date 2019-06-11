let numSquares = 6;
let colors = generateRandomColors(numSquares);
let squares = document.querySelectorAll(".square");
let displayColor = document.getElementById("display-color");
let messageTop = document.querySelector("#display-message");
let h1 = document.querySelector("h1");
let header = document.querySelector("#header");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let pickedColor = pickRandomColor();

for(let i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener("click", function() {
    modeButtons[0].classList.remove("selected");
    modeButtons[1].classList.remove("selected");
    this.classList.add("selected");
    // Ternary Operator
    this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
    reset()
  });
}

function reset() {
  // Reset the text on the resetButtons.
  resetButton.textContent = "New Colors";
  // Change displayColor to match picked color.
  displayColor.textContent = pickedColor;
  // Set the message in the top to an empty string.
  messageTop.textContent = "";
  // Set color of h1 to default color when game is reset. 
  h1.style.backgroundColor = "steelblue";
  // Generate all new colors.
  colors = generateRandomColors(numSquares);
  // Pick a new random color from array.
  pickedColor = pickRandomColor();
  
  // Change colors of squares.
  for(let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    if (!colors[i]) {
      squares[i].style.display = "none"
    } else {
      squares[i].style.display = "block"
    }
  }
    
}

resetButton.addEventListener("click", function() {
  reset();
})

displayColor.textContent = pickedColor;

for(let i = 0; i < squares.length; i++) {
  // Add colors to squares
  squares[i].style.backgroundColor = colors[i];

  // Add events to squares
  squares[i].addEventListener("click", function() {
    // Store clicked color to a variable
    let clickedColor =  this.style.backgroundColor;

    // Compare clicked color to the color of 
    // pickedColor variable.
    if (clickedColor === pickedColor) {
      // Player wins.
      messageTop.textContent = "You got it !!";
      h1.style.backgroundColor = clickedColor;
      changeSquareColors(clickedColor);
      resetButton.textContent = "Play Again?";
      // Player guesses wrong.
    } else {
      this.style.backgroundColor = "#232323";
      messageTop.textContent = "Try again!";
    }
  })
}

// Chnages all the squares to the same color when player wins.
function changeSquareColors(color) {
  for(let i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// Chooses one color from the colors array (randomly).
function pickRandomColor() {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index]
}

// Generates multiple random colors from the randomColors()  
// and stores random colors in an array.
function generateRandomColors(value) {
  let array = []
  for(let i = 0; i < value; i++) {
    array.push(randomColors());
  }
  return array;
}

// Generates one random color.
function randomColors() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
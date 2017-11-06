function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// The container of the squares
var container = document.getElementById("container");
// List of div-s that represent the squares
var squares = document.querySelectorAll(".square");
// Headling h1 tag
var h1 = document.querySelector("h1");
// The span tag that displays the color that the user needs to guess
var colorDisplay = document.getElementById("colorDisplay");
// The span tag the displays the main message
var messageDisplay = document.getElementById("message");
// List of the rgb colors that represent the colors of the squares
var listOfColors = [];
// The randomly-picked rgb color the player needs to guess
var pickedColor;
// Reset button
var resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", function() {
	if (this.textContent === "Play Again?") {
		this.textContent = "New Colors";
	}

	newGame();
});

// Modes buttons
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");

easyButton.addEventListener("click", function() {
	applyMode("Easy");
});

hardButton.addEventListener("click", function() {
	applyMode("Hard");
});

// Starting new game
newGame();


function newGame() {
	clean();

	createSquares();
	generateColors();
	pickColor();

	messageDisplay.textContent = "";
}

function applyMode(mode) {
	if (mode === "Easy") {
		if (!easyButton.classList.contains("selective")) {
			easyButton.classList.add("selective");

			if (hardButton.classList.contains("selective")) {
				hardButton.classList.remove("selective");
			}
		}
	} else if (mode === "Hard") {
		if (!hardButton.classList.contains("selective")) {
			hardButton.classList.add("selective");

			if (easyButton.classList.contains("selective")) {
				easyButton.classList.remove("selective");
			}
		}
	}

	newGame();
}

function createSquares() {
	squares = [];

	var mode = document.querySelector(".selective");
	var numOfSquares;

	if (mode.textContent == "Easy") {
		numOfSquares = 3;
	} else if(mode.textContent == "Hard") {
		numOfSquares = 6;
	}

	for(var i = 0; i < numOfSquares; i++) {
		var square = document.createElement("div");
		square.classList.add("square");

		square.addEventListener("click", function() {
			// Retrieving the background color and removing white spaces
			backgroundColor = this.style.backgroundColor.replaceAll(" ", "");
			if(backgroundColor === pickedColor) {
				onSuccess(pickedColor);
			} else {
				onFail(this);
			}
		});

		// Adding the square to the list
		squares.push(square);
		container.append(square);
	}
}

function generateColors() {
	listOfColors = [];

	for (var i = 0; i < squares.length; i++) {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);

		listOfColors.push(rgb(r,g,b));

		var square = squares[i];
		square.style.backgroundColor = listOfColors[i];
	}
}

function pickColor() {
	// Getting a random picked color
	var randomIndex = Math.floor(Math.random() * squares.length);
	pickedColor = listOfColors[randomIndex];

	// Set the content of the span tag to be the picked rgb color
	colorDisplay.innerHTML = pickedColor;
}

function clean() {
	for(var i = 0; i < squares.length; i++) {
		container.removeChild(squares[i]);
	}

	h1.style.backgroundColor = "steelblue";
}

function onSuccess(color) {
	squares.forEach(function(square) {
		square.style.backgroundColor = color;
	});

	h1.style.backgroundColor = color;

	messageDisplay.innerHTML = "Correct!";
	resetButton.innerHTML = "Play Again?"
}

function onFail(square) {
	square.style.backgroundColor = "#232323";

	messageDisplay.innerHTML = "Try Again";
}
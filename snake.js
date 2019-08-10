// Create Canvas Constant and a context constant
const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

//create the unit according to the background image
const box = 32;

// load food and background images

const background = new Image();
background.src = 'img/ground.png';

const background = new Image();
background.src = 'img/ground.png';

// Create the snake with index position

let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// create the food with their X and Y positions

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  x: Math.floor(Math.random() * 17 + 1) * box
};

// create the score variable

let score = 0;

// Create the draw function which will draw everything unto our canvas

function draw() {
  ctx.drawImage(ground, 0, 0);
}

// Create Canvas Constant and a context constant
const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

//create the unit according to the background image
const box = 32;

// load food and background images

const background = new Image();
background.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

// Create the snake with index position

let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// create the food with their X and Y positions
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

// create the score variable
let score = 0;

// Create the draw function which will draw everything unto our canvas
function draw() {
  ctx.drawImage(background, 0, 0);

  // loop over the snake to draw all the cells

  for (let i = 0; i < snake.length; i++) {
    //snake head style
    ctx.fillStyle = i == 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    // draw stroke on the snake head
    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  //draw the food
  ctx.drawImage(foodImg, food.x, food.y);
}

// call draw function every 100 ms
let game = setInterval(draw, 100);

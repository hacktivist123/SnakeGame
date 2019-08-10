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

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

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

// control snake with an event listener
document.addEventListener("keydown", direction);

let d;

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play()
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    down.play();
    d = "DOWN";
  }

}

// check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      dead.play();
      return true;
    }
  }
  return false;
}

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

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;


  //determine which DIRECTION is pressed
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  //increase snake if it eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
    // we don't remove the tail
  } else {
    // remove the tail
    snake.pop();
  }
  //add new Head
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // game over
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  //draw score
  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 100 ms
let game = setInterval(draw, 145);
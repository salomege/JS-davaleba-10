const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const startBtn = document.querySelector(`.start`)





const squareSize = 50;
const targetSize = 20;
const moveSpeed = 1;

let score = 0;
let squareX = 50;
let squareY = 100;

let targetX = 0;
let targetY = 0;

let up = false;
let down = false;
let right = false;
let left = false;


function startGame() {
    moveTarget();
    draw();
    moveSquare();
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') {
        up = true;
      }
      if (e.key === 'ArrowDown') {
        down = true;
      }
      if (e.key === 'ArrowRight') {
        right = true;
      }
      if (e.key === 'ArrowLeft') {
        left = true;
      }
    });
    document.addEventListener('keyup', e => {
      if (e.key === 'ArrowUp') {
        up = false;
      }
      if (e.key === 'ArrowDown') {
        down = false;
      }
      if (e.key === 'ArrowRight') {
        right = false;
      }
      if (e.key === 'ArrowLeft') {
        left = false;
      }
    });
}

startBtn.addEventListener(`click`,()=>{
  setTime = 30;
  startGame();
})

function draw() {
  resetCanvas();
  // Big square
  context.fillStyle = 'red';
  context.fillRect(squareX, squareY, squareSize, squareSize);
  // Small square
  context.fillStyle = 'green';
  context.fillRect(targetX, targetY, targetSize, targetSize);
}

function moveSquare() {
  if (up) {
    squareY -= moveSpeed;
  }
  if (down) {
    squareY += moveSpeed;
  }
  if (left) {
    squareX -= moveSpeed;
  }
  if (right) {
    squareX += moveSpeed;
  }
  if (squareX + squareSize > canvas.width) {
    squareX = canvas.width - squareSize;
  }
  if (squareY + squareSize > canvas.height) {
      squareY = canvas.height - squareSize;
    }
    squareX = Math.max(0, squareX);
    squareY = Math.max(0, squareY);
    if(isEaten()){
      score++
      moveTarget();
    }
    draw();
    setTimeout(() => moveSquare(), 1);
  }

  function moveTarget() {
  const {x, y} = getTargetRandomXY();
  targetX = x;
  targetY = y;
}

function getTargetRandomXY() {
  const x = Math.floor(Math.random() * (canvas.width - targetSize));
  const y = Math.floor(Math.random() * (canvas.height - targetSize));

  return {
    x: x,
    y: y,
  }
}

function resetCanvas() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function isEaten(){
  const squareBottom = squareY + squareSize;
  const squareRight = squareX + squareSize;
  const targetBottom = targetY + targetSize;
  const targetRight = targetX + targetSize;
  return squareBottom > targetBottom && squareY < targetY && squareRight > targetRight && squareX < targetX;
}

  
ProgressCountdown(30, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => alert(`Page has started: ${value}.`));

function ProgressCountdown(timeleft, bar, text) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;

      document.getElementById(bar).value = timeleft;
      document.getElementById(text).textContent = timeleft;

      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        
      }
    }, 1000);
  });
}
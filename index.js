//piste audio
var audio = new Audio("audio-game.mp3");
audio.play();
//To get the canvas element from HTML to JS
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

//velocity = inertie

//size of canvas will be equal to the size of HTML
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//define rectangle by default
let rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144, // position of player
  x_velocity: 0,
  y: 500, //positio of player
  y_velocity: 0,
};

//keyboard
let controller = {
  left: false,
  right: false,
  up: false, //when set at true, jump everytime but not when the player is on the platforme
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
      case 32: // space key
        controller.up = key_state;
        break;
    }
  },
};

//platforme
class Platforme {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = "/asset/PNG/platform.png";
  }
  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath(); //need to check what is it ?
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.drawImage(this.img, this.x, this.y);
  }
}

//to set the position and the sixe of the platforme
const platformes = [];
let platforme = new Platforme(100, 410, 650, 4); //2
platformes.push(platforme);
platforme = new Platforme(1210, 510, 230, 4); //1
platformes.push(platforme);
platforme = new Platforme(950, 450, 230, 4); //1bis
platformes.push(platforme);
platforme = new Platforme(1210, 340, 230, 4); //3
platformes.push(platforme);
platforme = new Platforme(100, 240, 230, 4); //4
platformes.push(platforme);
platforme = new Platforme(900, 240, 230, 4); //5
platformes.push(platforme);
platforme = new Platforme(620, 160, 230, 4); //6
platformes.push(platforme);
platforme = new Platforme(380, 80, 230, 4); //7
platformes.push(platforme);
platforme = new Platforme(1200, 120, 230, 4); //8
platformes.push(platforme);



//control the differents case of the rectangle
//call each frame 

let loop = function () {
  if (controller.up && rectangle.jumping == false) { //if player is not jumping and the up key is press, the player jump thanks to the volicity
    rectangle.y_velocity -= 30; 
    rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.5;//velocity to the left, so the player go to the left
  }

  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }

  //define gravity and friction
  //gravity to get the rectangle to the floor
  //friction to set if it will be slow or speed
  rectangle.y_velocity += 1.5; // update the velocity for if the player is jumping or not (gravity)
  rectangle.x += rectangle.x_velocity; //update the position x with the velocity
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9; // friction
  rectangle.y_velocity *= 0.9; // friction, allows to slow down the player

//   // if rectangle is falling below floor line
  if (rectangle.y > 592) {
    rectangle.jumping = false;
    rectangle.y = 592;
    rectangle.y_velocity = 0;
  }

  // if rectangle is going off the left and the right of the screen
  if (rectangle.x < -32) {
    rectangle.x = canvas.width;
  } else if (rectangle.x > canvas.width) {
    rectangle.x = -32;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height), (ctx.fillStyle = "#ff0000"); // clear screen 
  //draw player
  ctx.beginPath(); 
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill();

  //loop all the platforms
  for (let i = 0; i < platformes.length; i++) {
    const platforme = platformes[i];
    //check the colision 
    if (
      rectangle.y > platforme.y - 32 &&
      rectangle.y < platforme.y + platforme.height &&
      rectangle.x >= platforme.x &&
      rectangle.x <= platforme.x + platforme.width //500
    ) {
      rectangle.jumping = false; //false
      rectangle.y = platforme.y  - 32;
      rectangle.y_velocity = 0;
    }
//draw platforme
    platforme.draw(ctx);
  }



  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

//check if the user press up or down
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

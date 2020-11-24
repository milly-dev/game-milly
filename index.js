import { Platforme } from "./platform.js";
import { Coin } from "./coin.js";
import { Sprite } from "./sprite.js";

//To get the canvas element from HTML to JS
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

//velocity = inertie

//size of canvas will be equal to the size of HTML
canvas.width = 820;
canvas.height = 460;

//define rectangle by default
let rectangle = {
  height: 4,
  jumping: true,
  width: 32,
  x: 144, // position of player
  x_velocity: 0,
  y: 500, //positio of player
  y_velocity: 0,
};

const paths = [
  "/asset/PNG/player/walk/Walk (1).png",
  "/asset/PNG/player/walk/Walk (2).png",
  "/asset/PNG/player/walk/Walk (3).png",
  "/asset/PNG/player/walk/Walk (4).png",
  "/asset/PNG/player/walk/Walk (5).png",
  "/asset/PNG/player/walk/Walk (6).png",
  "/asset/PNG/player/walk/Walk (7).png",
  "/asset/PNG/player/walk/Walk (8).png",
  "/asset/PNG/player/walk/Walk (9).png",
  "/asset/PNG/player/walk/Walk (10).png",
  "/asset/PNG/player/walk/Walk (11).png",
  "/asset/PNG/player/walk/Walk (12).png",
  "/asset/PNG/player/walk/Walk (13).png",
  "/asset/PNG/player/walk/Walk (14).png",
  "/asset/PNG/player/walk/Walk (15).png",
  "/asset/PNG/player/walk/Walk (16).png",
  "/asset/PNG/player/walk/Walk (17).png",
  "/asset/PNG/player/walk/Walk (18).png",
  "/asset/PNG/player/walk/Walk (19).png",
  "/asset/PNG/player/walk/Walk (20).png",
];

const sprite = new Sprite(ctx, paths, 42, 55);

//keyboard
let controller = {
  canJump: true,
  left: false,
  right: false,
  up: false, //when set at true, jump everytime but not when the player is on the platforme
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;
    //console.log(event.keyCode);
    switch (event.keyCode) {
      case 37: // left key
        if (key_state === true) {
          sprite.startAnimation();
        } else {
          sprite.stopAnimation();
        }
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        if (key_state === false) {
          controller.canJump = true;
        }
        break;
      case 39: // right key
        if (key_state === true) {
          sprite.startAnimation();
        } else {
          sprite.stopAnimation();
        }
        controller.right = key_state;
        break;
      case 32: // space key
        controller.up = key_state;
        if (key_state === false) {
          controller.canJump = true;
        }
        break;
    }
  },
};

//to set the position and the sixe of the platforme
const platformes = [];
let platforme = new Platforme(255, 260, 120, 4);
platformes.push(platforme);
platforme = new Platforme(105, 290, 120, 4);
platformes.push(platforme);
platforme = new Platforme(5, 290, 120, 4);
platformes.push(platforme);
platforme = new Platforme(600, 290, 120, 4); //1bisright
platformes.push(platforme);
platforme = new Platforme(500, 290, 120, 4); //1
platformes.push(platforme);
platforme = new Platforme(695, 210, 120, 4); //2 right
platformes.push(platforme);
platforme = new Platforme(620, 130, 120, 4); //3 right
platformes.push(platforme);
platforme = new Platforme(695, 50, 120, 4); //4 right
platformes.push(platforme);

platforme = new Platforme(300, 130, 120, 4); //middle avant dernier
platformes.push(platforme);
platforme = new Platforme(200, 130, 120, 4); //middle avant dernier
platformes.push(platforme);
platforme = new Platforme(100, 60, 120, 4); //middle avant dernier
platformes.push(platforme);
platforme = new Platforme(50, 60, 120, 4); //middle avant dernier
platformes.push(platforme);

platforme = new Platforme(400, 200, 120, 4); //middle
platformes.push(platforme);

platforme = new Platforme(15, 210, 120, 4);
platformes.push(platforme);

platforme = new Platforme(460, 80, 120, 4);
platformes.push(platforme);

const coins = [];
let coin = new Coin(335, 355, 20, 20);
coins.push(coin);

//

//control the differents case of the rectangle
//call each frame

let loop = function () {
  if (controller.up && rectangle.jumping == false && controller.canJump) {
    //if player is not jumping and the up key is press, the player jump thanks to the volicity
    rectangle.y_velocity -= 25;
    rectangle.jumping = true;
    controller.canJump = false;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.2; //velocity to the left, so the player go to the left
  }

  if (controller.right) {
    rectangle.x_velocity += 0.2;
  }

  sprite.update();

  //define gravity and friction
  //gravity to get the rectangle to the floor
  //friction to set if it will be slow or speed
  rectangle.y_velocity += 1.5; // update the velocity for if the player is jumping or not (gravity)
  rectangle.x += rectangle.x_velocity; //update the position x with the velocity
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9; // friction
  rectangle.y_velocity *= 0.9; // friction, allows to slow down the player

  //   // if rectangle is falling below floor line
  if (rectangle.y > 372) {
    rectangle.jumping = false;
    rectangle.y = 372;
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

  sprite.draw(rectangle.x, rectangle.y - sprite.height * 0.8);
    checkColissions();
  //loop all the platforms
  for (let i = 0; i < platformes.length; i++) {
    const platforme = platformes[i];
    //check the colision
    if (
      rectangle.y_velocity > 0 &&
      rectangle.y > platforme.y - 32 &&
      rectangle.y < platforme.y + platforme.height &&
      rectangle.x >= platforme.x &&
      rectangle.x <= platforme.x + platforme.width //500
    ) {
      rectangle.jumping = false; //false
      rectangle.y = platforme.y - rectangle.height;
      rectangle.y_velocity = 0;
    }
    //draw platforme
    platforme.draw(ctx);
  }

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

var coinSound = new Audio("coinsound.mp3");

function checkColissions() {
  for (let coinIndx = 0; coinIndx < coins.length; coinIndx++) {
    const coin = coins[coinIndx];
    if (
      rectangle.y > coin.y &&
      rectangle.y < coin.y + coin.height &&
      rectangle.x >= coin.x &&
      rectangle.x <= coin.x + coin.width //500
    ) {
      console.log("colision", coinSound);
      //coinSound.play();
      coin.y = -1000 
      coinSound.play();
    }
    coin.draw(ctx);
  }
}

//check if the user press up or down
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

let state = {
  sound: true,
};

var audio = new Audio("audio-game.mp3");


document.querySelector(".volume").addEventListener("click", () => {
  if (state.sound === true) {
    audio.play();
  } else {
    audio.pause();
  }
  state.sound = !state.sound;
});
console.log(state);



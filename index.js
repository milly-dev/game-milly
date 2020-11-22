//To get the canvas element from HTML to JS
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

//size of canvas will be equal to the size of HTML
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//define rectangle by default
let rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
};

let controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;

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
    }
  },
};

//platforme 
class Platforme{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(ctx){
        ctx.fillStyle = "white";
        ctx.beginPath(); //need to check what is it ?
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

//to set the position and the sixe of the platforme
const platformes = [];
let platforme = new Platforme(100, 410, 650, 4);//2
platformes.push(platforme);
platforme = new Platforme(1210, 510, 230, 4);//1
platformes.push(platforme);
platforme = new Platforme(1210, 340, 230, 4);//3
platformes.push(platforme);
platforme = new Platforme(100, 240, 230, 4);//4
platformes.push(platforme);
platforme = new Platforme(900, 240, 230, 4);//5
platformes.push(platforme);
platforme = new Platforme(620, 160, 230, 4);//6
platformes.push(platforme);
platforme = new Platforme(380, 80, 230, 4);//7
platformes.push(platforme);
platforme = new Platforme(1200, 120, 230, 4);//8
platformes.push(platforme);

//control the differents case of the rectangle

let loop = function () {
  if (controller.up && rectangle.jumping == false) {
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.5;
  }

  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }

  //define gravity and friction
  //gravity to get the rectangle to the floor
  //friction to set if it will be slow or speed
  rectangle.y_velocity += 1.5; // gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9; // friction
  rectangle.y_velocity *= 0.9; // friction, allows to slow down the player 

  // if rectangle is falling below floor line
  if (rectangle.y > 605 - 16 - 32) {
    rectangle.jumping = false;
    rectangle.y = 605 - 16 - 32;
    rectangle.y_velocity = 0;
  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {
    rectangle.x = canvas.width;
  } else if (rectangle.x > canvas.width) {
    // if rectangle goes past right boundary

    rectangle.x = -32;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height), (ctx.fillStyle = "#ff0000"); // hex for red
  ctx.beginPath();
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill();
  
for(let i=0;i<platformes.length; i++){
    const platforme= platformes[i];
    if (
        rectangle.y > platforme.y - 16 - 32 &&
        rectangle.x >= platforme.x &&
        rectangle.x <= platforme.x + platforme.width //500
      ) {
        rectangle.jumping = false; //false
        rectangle.y = platforme.y - 16 - 32;
        rectangle.y_velocity = 0;
      }
}


  //platforme

  for (let i=0; i<platformes.length; i++){
      const platforme=platformes[i];
      platforme.draw(ctx);

  }
//   ctx.fillStyle = "white";
//   ctx.beginPath(); //need to check what is it ?
//   ctx.rect(500, 550, 200, 4);
//   ctx.fill();


  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};



//check if the user press up or down
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

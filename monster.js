import { Sprite } from "./sprite.js";

export class Monster {
  constructor(ctx, x, y, width, height, left, right) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = [];
    this.images.length = 10;
    this.left = left;
    this.right = right;
    this.ctx = ctx;

    for (let i = 1; i < this.images.length; i++) {
      this.images[i] = new Image();
      this.images[i].src = "/asset/PNG/female/Walk (" + i.toString() + ").png";
    }
    this.i = 1;
    this.move = 0;
    this.direction = 0.5;
  }
  draw(ctx) {
    this.i += 0.2;
    if (this.i >= 10) {
      this.i = 1;
    }

    this.move += this.direction;
    this.x += this.direction;

    if (this.move < this.left) {
      this.direction = 0.5;
    } else if (this.move > this.right) {
      this.direction = -0.5;
    }

    // this.sprite.update();
    // ctx.fillStyle = "#fffff";
    // ctx.beginPath(); 
    // ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fill();
    ctx.drawImage(
      this.images[Math.floor(Math.trunc(this.i))],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
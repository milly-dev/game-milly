import { Sprite } from "./sprite.js";

export class Monster {
  constructor(ctx, x, y, width, height, move, direction) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = [];
    this.images.length = 10;
    this.move = move;
    this.direction = direction;
    this.ctx = ctx;

    for (let i = 1; i < this.images.length; i++) {
      this.images[i] = new Image();
      this.images[i].src = "/asset/PNG/female/Walk (" + i.toString() + ").png";
    }
    this.i = 1;
    this.move = 0;
    this.direction = 0.1;
  }
  draw(ctx) {
    this.i += 0.2;
    if (this.i >= 10) {
      this.i = 1;
    }

    this.move += this.direction;
    this.x += this.direction;

    if (this.move < -20) {
      this.direction = 0.1;
    } else if (this.move > 40) {
      this.direction = -0.1;
    }

    // this.sprite.update();
    ctx.fillStyle = "#fffff";
    ctx.beginPath(); //need to check what is it ?
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.drawImage(
      this.images[Math.floor(Math.trunc(this.i))],
      this.x,
      this.y,
      this.width,
      this.height
    );

    //   this.sprite.draw(this.x,this.y);
  }
}

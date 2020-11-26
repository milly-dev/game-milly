//platforme
export class Platforme {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = "./asset/PNG/platform.png";
  }
  draw(ctx) {
    // ctx.fillStyle = "red";
    // ctx.beginPath(); 
    // ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fill();
    ctx.drawImage(this.img, this.x, this.y);
  }
}

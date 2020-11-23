export class Coin {
        constructor(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.img = new Image();
          this.img.src = "/asset/PNG/coins.png";
        }
        draw(ctx) {
          ctx.fillStyle = "#fffff";
          ctx.beginPath(); //need to check what is it ?
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.fill();
          ctx.drawImage(this.img, this.x, this.y);
        }
      }
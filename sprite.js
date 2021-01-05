export class Sprite {
  constructor(ctx, paths, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.position = 0;
    this.imgs = [];
    this.flip = false;

    paths.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imgs.push(img);
    });

    this.animation = false;
  }

  update() {
    if (this.animation === true) {
      this.position += 1;
      if (this.position >= this.imgs.length) {
        this.position = 0;
      }
    }
  }

  stopAnimation() {
    this.position = 0;
    this.animation = false;
  }

  startAnimation() {
    this.animation = true;
  }

  right() {
    this.flip = false;
  }

  left() {
    this.flip = true;
  }

  draw(x, y) {
    this.ctx.save();
    if (this.flip) {
      this.ctx.scale(-1, 1);
    }
    this.ctx.drawImage(
      this.imgs[this.position],
      10,
      10,
      500,
      500,
      this.flip ? -x - this.width: x,
      y,
      this.width,
      this.height
    );
    this.ctx.restore();
  }
}

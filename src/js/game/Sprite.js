class Sprite extends Entity {
  constructor(obj){
    super({
      name: obj.name,

      img: obj.img,

      x: obj.x,
      y: obj.y,

      width : obj.width,
      height: obj.height,
      realWidth: obj.realWidth,
      realHeight: obj.realHeight
    });

    this._sprite_animation = {
      frameDuration: obj.frameDuration || 0,
      numberFrame: obj.numberFrame || 0,

      offSet: {
        x: obj.offSetX || 0,
        y: obj.offSetY || 0,
        nx: obj.nx || 0,
        ny: obj.ny || 0
      }
    }

    this.animation = this.animation.bind(this);
  }

  animation(actualFrame){
    if(this.frameDuration != 0){
      console.log()
      if(actualFrame % this.frameDuration == 0){
        if(this.frameX == (this.numberFrame - 1)) this.frameX = 0;
        else this.frameX++;

        if(this.frameY == (this.numberFrame - 1)) this.frameY = 0;
        else this.frameY++;
      }
    }

    return {
      sx: this.offSetX,
      sy: this.offSetY
    }
  }

  get sWidth() {
    return this._sprite_animation.offSet.x;
  }

  get sHeight() {
    return this._sprite_animation.offSet.y;
  }

  get frameDuration() {
    return this._sprite_animation.frameDuration;
  }

  get numberFrame() {
    return this._sprite_animation.numberFrame;
  }

  get frameX() {
    return this._sprite_animation.offSet.nx;
  }

  set frameX(x) {
    this._sprite_animation.offSet.nx = x;
  }

  get frameY(){
    return this._sprite_animation.offSet.ny;
  }

  set frameY(y){
    this._sprite_animation.offSet.ny = y;
  }

  get offSetX() {
    return this._sprite_animation.offSet.x * this.frameX;
  }

  get offSetY() {
    return this._sprite_animation.offSet.y * this.frameY;
  }


}

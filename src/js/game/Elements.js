class Ground extends Sprite {
  constructor(id, type, x, y, width, height){
    const nx = parseXY(type)[0];
    const ny = parseXY(type)[1];
    super({
      name: 'Ground' + id, 
      x, y, width, height,
      img: '/img/sprites/spritesheet_ground.png',
      realWidth: 128, realHeight: 128,

      solid: true,


      offSetX: 128, offSetY: 128,
      nx, ny
    });
  }

  animation(){
    return {
      sx: super.offSetX,
      sy: super.offSetY
    }
  }
}

class Coin extends Sprite {
  constructor(id, velocity, x, y, width, height){
    super({
      name: 'Coin' + id, 
      x, y, width, height,
      img: '/img/sprites/coin_spritesheet.png',
      realWidth: 22, realHeight: 22,


      offSetX: 22, offSetY: 0,
      nx: 0, ny:0, numberFrame: 4,
      frameDuration: velocity
    });

    this.dy = 5;
    this.direction = true; // su
    this.originY = y;
  }
  animation(frame){
    if(frame % 5 == 0){
      if(this.direction)
        this.y++;
      else this.y--;
    }

    if(Math.abs(this.y - this.originY) > this.dy) this.direction = !this.direction;

    return super.animation(frame);
  }
}

class Item extends Sprite {
  constructor(id, type, x, y, width, height, floating = true){
    const nx = parseXY(type)[0];
    const ny = parseXY(type)[1];
    super({
      name: 'Item' + id, 
      x, y, width, height,
      img: '/img/sprites/spritesheet_items.png',
      realWidth: 128, realHeight: 128,


      offSetX: 128, offSetY: 128,
      nx, ny
    });

    this.floating = floating;
    this.dy = Math.floor(Math.random() * 5) + 5;
    this.direction = true; // su
    this.originY = y;
  }

  animation(frame){
    if(this.floating){
      if(frame % 5 == 0){
        if(this.direction)
          this.y++;
        else this.y--;
      }
  
      if(Math.abs(this.y - this.originY) > this.dy) this.direction = !this.direction;
    }
    


    return {
      sx: super.offSetX,
      sy: super.offSetY
    }
  }
}
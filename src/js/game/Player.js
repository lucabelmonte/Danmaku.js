class Player extends Sprite {
  constructor(id, x, y, width, height){
    const type = '0:0';
    const nx = parseXY(type)[0];
    const ny = parseXY(type)[1];
    super({
      name: 'Player' + id, 
      x, y, width, height,
      img: '/img/sprites/vector_characters.png',
      realWidth: 80, realHeight: 110,


      offSetX: 80, offSetY: 110,
      nx, ny
    });

    this.direction = 0;

    this.dx = 0;
    this.dy = 5;

    this.directionSprite = [
      {}, {}, {}, {}, {}
    ];

    

    this.keyPress = this.keyPress.bind(this);
    this.keyUp = this.keyUp.bind(this);

    window.addEventListener('keypress', this.keyPress);
    window.addEventListener('keyup', this.keyUp);
  }

  checkCollision(groundObj){
    
    groundObj.forEach((ele) => {
      if (this.x < ele.x + ele.width &&
        this.x + this.width > ele.x &&
        this.y < ele.y + ele.height &&
        this.height + this.y > ele.y) {
        
        console.log('collision detection!');
        if(this.dy > 0){
          if(this.y < ele.y)
          this.y = ele.y - this.height;
        } 
        return;
      }
    });



    
  }

  keyPress(e){
    const key = e.key;
    switch(key){
      case 'd':
        this.dx = 5;
        
        break;

      case 'a':
        this.dx = -5;
        break;
      case ' ':
        this.dy = -5;
        break;
      case 'w':
      break;

    }
   
  }

  keyUp(e){
    const key = e.key;
    switch(key){
      case 'd':
        this.dx = 0;
        
        break;

      case 'a':
        this.dx = 0;
        break;
      case ' ':
        this.dy = 5;
        break;
      case 'w':
      break;

    }
  }

  animation(){
    this.x += this.dx;
    this.y += this.dy;

    
    return {
      sx: super.offSetX,
      sy: super.offSetY
    }
  }
}
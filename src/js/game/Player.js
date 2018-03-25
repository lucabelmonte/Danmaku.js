class Player extends Sprite {
  constructor(id, x, y, width, height){
    
    const type = '0:0';
    const nx = parseXY(type)[0];
    const ny = parseXY(type)[1];
    super({
      name: 'Player' + id, 
      x, y, width, height,
      img: '/img/sprites/Player/p1_spritesheet.png',
      realWidth: 74, realHeight: 90,


      offSetX: 74, offSetY: 90,
      nx, ny
    });

    

    this.direction = 0;

    this.isAttached = false;


    this.dx = 0;
    this.dy = 6;

    this.jump = {
      status: false, 
      y: this.y
    }

    this.spritekey = {
      jump: "6:2"
    }


    this.animation = this.animation.bind(this);

    this.keyPress = this.keyPress.bind(this);
    this.keyUp = this.keyUp.bind(this);

    window.addEventListener('keydown', this.keyPress);
    window.addEventListener('keyup', this.keyUp);
  }

  checkCollision(groundObj){
    
    groundObj.forEach((ele) => {
      if (this.x < ele.x + ele.width &&
        this.x + this.width > ele.x &&
        this.y < ele.y + ele.height &&
        this.height + this.y > ele.y) {
        
        if(this.dy > 0){
          if(this.y < ele.y)
          this.y = ele.y - this.height;
        } else {
          window.removeEventListener('keydown', this.keyPress);
          this.dy = 6;
        }
        return;
      }
    });
  }

  attachedToGround(Layer1){
    let temp = false;
    Layer1.forEach(ele => {
      if(ele.solid &&
        Math.abs(ele.x - this.x) < (this.width - 5) &&
        Math.abs((this.y + this.height) - ele.y) < 4
      ) {
        console.log(this.y, ele.y - this.height);
        temp = true;
        
        return;
      }
    });

    this.attached = temp;
  }

  keyPress(e){
    const key = e.key;
    console.log(key);
    switch(key){
      case 'd': case 'ArrowRight':
        this.dx = 5;
        
        break;

      case 'a': case 'ArrowLeft':
        this.dx = -5;
        break;
      case ' ':
        if(this.attached){
          super.frameY = 1;
          super.frameX = 6;
          this.dy = -6;
          this.isJumping = true;
          this.jump.y = this.y - (60 + this.height);
        }
          
        break;
      case 'w':
      break;

    }
   
  }

  keyUp(e){
    const key = e.key;
    switch(key){
      case 'd': case 'ArrowRight':
        this.dx = 0;
        break;

      case 'a': case 'ArrowLeft':
        this.dx = 0;
        break;
      case ' ':
        //window.addEventListener('keydown', this.keyPress);
        //this.dy = 5;
        break;
      case 'w':
      break;

    }
  }

  jump() {

  } 

  animation(){
    if(!this.attached && this.isJumping == false) {
      super.frameY = 0;
      super.frameX = 6;
      this.dy = 7;
    }
    else {
      if(!this.isJumping) this.dy = 0;
      else {
        if(this.jump.y > this.y) {
          super.frameY = 0;
          super.frameX = 6;
          this.dy = 7;
          this.isJumping = false;
        }
      }
    }

    if(this.dy == 0) {
      super.frameY = 0;
      super.frameX = 0;
    }


    this.x += this.dx;
    this.y += this.dy;

    
    return {
      sx: super.offSetX,
      sy: super.offSetY
    }
  }


  get attached() {
    return this.isAttached;
  }

  set attached(x) {
    this.isAttached = x == true;
  }

  get isJumping() {
    return this.jump.status;
  }

  set isJumping(x) {
    this.jump.status = x == true;
  }
}
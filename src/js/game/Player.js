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

    this.velocity = {
      x: 4,
      y: 4.5
    }

    this.dx = 0;
    this.dy = this.velocityY;


    this.jumpSize = 68;
	
	

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

    window.addEventListener('keypress', this.keyPress);
    window.addEventListener('keyup', this.keyUp);

  }

  checkCollision(Layer, method){
    
    Layer.forEach((ele) => {
      if (this.x < ele.x + ele.width &&
        this.x + this.width > ele.x &&
        this.y < ele.y + ele.height &&
        this.height + this.y > ele.y) {
          if(ele.solid){
            if(Math.abs((ele.y + ele.height) - this.y) <= 40 && Math.abs((ele.x - this.x) <  this.width)){
              if(this.isJumping)
                this.isJumping = false;
            } else {
  
            }
          } else {
			if(ele instanceof Coin || ele instanceof Item){
			  let music; 
			  if(ele instanceof Coin)
				music = new Audio("/audio/sfx/Mario-coin-sound.mp3");
              
			  if(ele instanceof Item)
			  	music = new Audio("/audio/sfx/gem.ogg");

			  music.volume = 0.2;
              music.play();
              return Layer.splice(Layer.indexOf(ele), 1);
			}
			if(ele instanceof Door){
				console.log(1);
			}
            
          }
          
        
          //this.dx = 0;

      }
    })
    return Layer;
  }

  attachedToGround(Layer1){
    let temp = false;
    Layer1.forEach(ele => {
      if(ele.solid &&
        Math.abs(ele.x - this.x) < (this.width - 5) &&
        Math.abs((this.y + this.height) - ele.y) < 3
      ) {
        if(!this.attached){
          // const music = new Audio("/audio/sfx/potpickup.ogg");
          // music.play();
        }
          temp = true;
          this.attached = temp;
          return;
      }
    });

    this.attached = temp;
  }

  keyPress(e){
    const key = e.key;


    switch(key){
      case 'd': case'c': case 'ArrowRight':
        this.dx = this.velocity.x;

        break;

      case 'a': case'z': case 'ArrowLeft':
        this.dx = -this.velocity.x;
        break;
      case ' ': case 'w': case "ArrowUp":
        if(this.attached){
          super.frameY = 1;
          super.frameX = 6;
          this.dy = -this.velocity.y;
          this.isJumping = true;
          this.jump.y = this.y - (this.jumpSize + this.height);
        }

        break;
      case 'w':
      break;

    }

  }

  keyUp(e){
    const key = e.key;
    switch(key){
      case 'd': case'c': case 'ArrowRight':
        this.dx = 0;
        break;

      case 'a': case'z': case 'ArrowLeft':
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



  animation(){
	if(this.dx > 0 && this.x + this.width + 1 > SCREEN_W || this.dx < 0 && this.x - 1 < 0)
		this.dx = 0;
	
	
    if(!this.attached && this.isJumping == false) {
      super.frameY = 0;
      super.frameX = 6;
      this.dy = this.velocity.y;
    }
    else {
      if(!this.isJumping) this.dy = 0;
      else {
        if(this.jump.y > this.y) {
          super.frameY = 0;
          super.frameX = 6;
          this.dy = this.velocity.y;
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

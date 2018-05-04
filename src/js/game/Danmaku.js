class Danmaku {
  constructor(id, width = 900, height = 600) {
    this.width = width;
    this.height = height;
    
    // create canvas
    this.ctx = $('<canvas></canvas>');
    this.ctx.attr({
      width: this.width,
      height: this.height
    });
    this.ctx.css('background', 'black');
    $('#' + id).append(this.ctx);

    $.extend($.jCanvas.defaults, {
      fromCenter: false,
    });

    this.FPS = 60;
    this.frame = 0;
    this.start;

    window.requestAnimFrame = (function(callback) {
 
      return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
              
             function(callback) {
                window.setTimeout(callback, 1000 / this.FPS);
             }; 
    })();


    // MAIN PARAMETRI

    this.backGround = '';


    this.groundObj = []; // level 1
    this.Layer2 = [];
    this.Layer3 = []; // level 2
	
	
	this.indexMap = 0;
	this.maxMap = 10;
	
    //this.map = 'Test2.json';
	
	
    this.defaultsParameter = {
      block: {
        width: 40, 
        height: 40
      }
    }

    this.audio;

    //BINDING METHOD

    this.update = this.update.bind(this);
    this.preload = this.preload.bind(this);
    this.play = this.play.bind(this);
	
	this.setMap = this.setMap.bind(this);
  }

  // MAIN METHOD:
  // preload: init the play

  get map(){
	return "map" + this.indexMap + ".json";
  }
  
  setMap(index){
	  console.log(1);
	 if(index < this.maxMap)
		this.indexMap = index; 
  }
  
  
  

  play() {
    const frameStart = Date.now();
    this.preload();

    let frame = 0;
    this.start = Date.now();

    this.update(this.frame);

    // setInterval(() => {
    //   this.update(frame++, frameStart)}
    // , 1000/this.FPS)
  }

  preload() {
    this.loadMap();

    this.audio = new Audio("/audio/music/Ove Melaa - Italo Unlimited.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.05;
    this.audio.play();
  
	
	//this.Layer3.push(new Door('', 20, 420, 50, 100));

    this.player = new Player('', 200, 0, 40, 50);

    this.Layer3.push(new Heart('', 0, 0, 0, this.player));

  }

  // MAIN METHOD

  update(frame) {
    this.ctx.removeLayers();
    this.loadBackGround();
    

    
    this.groundObj.forEach((ele) => {
      this.addLayer(ele, frame)
    });

    this.Layer2.forEach((ele) => {
      this.addLayer(ele, frame)
    });

    this.Layer3.forEach((ele) => {
      this.addLayer(ele, frame)
    });

    this.addLayer(this.player, frame);

    this.player.checkCollision(this.groundObj)
    this.Layer3 = this.player.checkCollision(this.Layer3, this.setMap)
	
    this.player.attachedToGround(this.groundObj)
    
    this.ctx.drawLayers();


    // TEST
    
    window.requestAnimFrame(() => {
      if(frame % this.FPS == 0){
        const fps = Date.now() - this.start;
        this.start = Date.now();
      }
      this.frame++;
      this.update(this.frame);
    });
  }



  addLayer(obj, frame){
    const offSetAnimation = obj.animation(frame);
    this.ctx.addLayer({
      type: 'image',
      x: obj.x,
      y: obj.y,
      source: obj.img,
      width:  obj.width,
      height: obj.height,
      sWidth: obj.realWidth,
      sHeight: obj.realHeight,
      //offSet3,
      sx: offSetAnimation.sx || 0, sy: offSetAnimation.sy || 0,
      click: obj.click
    }) ;
  }

  loadBackGround() {
    this.ctx.addLayer({
      type: 'image',
      x: 0,
      y: 0,
      source: '/img/Backgrounds/' + this.backGround,
      width:  this.width,
      height: this.height,
      
    });
  }

  loadMap(){
    const source = '/json/';
    $.get(source+this.map, (data) => {
      this.backGround = data.background;
      const layer1 = data.Layer1;
      const layer2 = data.Layer2;
      const layer3 = data.Layer3;
	  
	console.log(layer3);
	  
      layer1.forEach((obj) => {
        this.groundObj = this.groundObj.concat(this.createElement(obj));
      });

      layer2.forEach((obj) => {
        this.Layer2 = this.Layer2.concat(this.createElement(obj));
      });

      layer3.forEach((obj) => {
		  
        this.Layer3 = this.Layer3.concat(this.createElement(obj));
      });
    });
  }

  createElement(obj){
    const objectType = obj.type;
	console.log(objectType)
    const dim = obj.dimension;
    const nx = parseXY(dim)[0];
    const ny = parseXY(dim)[1];

    let myArray = [];
	
	if(objectType == "Item"){
            myArray.push(new Item(
            'Item',
            obj.icon,
            obj.x, 
            obj.y,
            obj.width,
            obj.height,
            obj.floating || false
           ))
		   
		 return myArray;
	}
	
	if(objectType == "Door"){
            myArray.push(new Item(
            'Item',
            obj.icon,
            obj.x, 
            obj.y,
            obj.width,
            obj.height,
            obj.floating || false
           ))
		   
		 return myArray;
	}


    for(let i = 0; i < ny; i++){
      for(let j = 0; j < nx; j++){
        switch(objectType){
          case 'Ground': 
            const width = obj.width || this.defaultsParameter.block.width;
            const height = obj.height || this.defaultsParameter.block.height;
            myArray.push(new Ground( 
              'Ground'+i+':'+j, 
              obj.icon, 
              obj.x + width * j, 
              obj.y + height * i,
              width,
              height
              
            ));
            break;
			
			case 'Door':
          
            myArray.push(new Door(
              'Door'+i+j,
              obj.x + obj.width * j, 
              obj.y + obj.height * i,
              obj.width,
              obj.height
            ))
            break;
			

          case 'Coin':
          
            myArray.push(new Coin(
              'Coin'+i+j,
              obj.velocity,
              obj.x + obj.width * j, 
              obj.y + obj.height * i,
              obj.width,
              obj.height
            ))
            break;


          case 'Item':
		  console.log(21);
            myArray.push(new Item(
            'Item'+i+j,
            obj.icon,
            obj.x + obj.width * j, 
            obj.y + obj.height * i,
            obj.width,
            obj.height,
            obj.floating || false
           ))
            
            break;

          case 'Tiles':
            myArray.push(new Tiles(
            'Item'+i+j,
            obj.icon,
            obj.x + obj.width * j, 
            obj.y + obj.height * i,
            obj.width,
            obj.height
           ))
            
            break;
        }

      }
    }

    return myArray;
  }
}


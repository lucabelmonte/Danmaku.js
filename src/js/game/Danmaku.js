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

    this.FPS = 100;


    // MAIN PARAMETRI

    this.backGround = '';


    this.groundObj = []; // level 1
    this.itemsObj  = []; // level 2

    this.map = 'test.json';

    this.defaultsParameter = {
      block: {
        width: 40, 
        height: 40
      }
    }

    //BINDING METHOD

    this.update = this.update;
    this.preload = this.preload.bind(this);
    this.play = this.play;
  }

  // MAIN METHOD:
  // preload: init the play

  

  play() {
    const frameStart = Date.now();
    this.preload();

    let frame = 0;

    setInterval(() => {
      this.update(frame++, frameStart)}
    , 1000/this.FPS)
  }

  preload() {
    this.ctx.addLayer({
      type: 'image',
      x: 0,
      y: 0,
      source: '\src\img\Backgrounds/blue_desert.png',
      width:  this.width,
      height: this.height,
      
    });

    this.loadMap();

  
    this.itemsObj.push(new Coin('', 30, 100, this.height - 50*6, 20, 20));
    this.itemsObj.push(new Coin('', 20, 400, this.height - 50*6, 20, 20));
    


    // this.itemsObj.push(new Item('', "5:0", 200, this.height - 50*6, 40, 40));
    // this.itemsObj.push(new Item('', "3:1", 300, this.height - 250, 50, 70, false));

    this.player = new Player('', 200, 0, 40, 50);

    this.itemsObj.push(new Heart('', 0, 0, 0, this.player));

    this.itemsObj.push(this.player);
    

    //console.log(this.groundObj)
  }

  // MAIN METHOD

  update(frame) {
    this.ctx.removeLayers();
    this.loadBackGround();
    

    
    this.groundObj.forEach((ele) => {
      this.addLayer(ele, frame)
    });

    this.itemsObj.forEach((ele) => {
      this.addLayer(ele, frame)
    });

    this.player.checkCollision(this.groundObj)
    this.player.attachedToGround(this.groundObj)
    
    this.ctx.drawLayers();
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
      layer1.forEach((obj) => {
        this.groundObj = this.groundObj.concat(this.createElement(obj));
      });

      layer2.forEach((obj) => {
        this.itemsObj = this.itemsObj.concat(this.createElement(obj));
      });
    });
  }

  createElement(obj){
    const objectType = obj.type;

    const dim = obj.dimension;
    const nx = parseXY(dim)[0];
    const ny = parseXY(dim)[1];

    let myArray = [];

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
        }

      }
    }

    return myArray;
  }
}


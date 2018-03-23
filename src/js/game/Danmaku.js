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


    // MAIN PARAMETRI

    this.backGround = '';


    this.groundObj = []; // level 1
    this.itemsObj  = []; // level 2

    this.map = 'test.json';


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
      this.update(frame++)}
    , 1000/60)
  }

  preload() {
    this.ctx.addLayer({
      type: 'image',
      x: 0,
      y: 0,
      source: '\src\img\Backgrounds/blue_desert.png',
      width:  this.width,
      height: this.height,
      
    }) ;

    this.loadMap();

  
    this.itemsObj.push(new Coin('', 30, 100, this.height - 50*6, 30, 30));

    this.itemsObj.push(new Item('', "4:0", 200, this.height - 50*6, 40, 40));
    this.itemsObj.push(new Item('', "0:1", 300, this.height - 250, 50, 70, false));

    //console.log(this.groundObj)
  }

  update(frameStart) {
    const frame = frameStart; //Math.floor((Date.now() - frameStart) /
    this.ctx.removeLayers();
    this.loadBackGround();
    

    
    this.groundObj.forEach((ele) => {
      this.addLayer(ele, frame)
    });

    this.itemsObj.forEach((ele) => {
      this.addLayer(ele, frame)
    });
    
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

  loadMap(){
    const source = '/json/';
    $.get(source+this.map, (data) => {
      this.backGround = data.background;
      const d = data.Objects;
      d.forEach((obj) => {
        this.groundObj = this.groundObj.concat(this.createElement(obj));
      });
    });
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
            myArray.push(new Ground( 
              'Ground'+i+':'+j, 
              obj.icon, 
              obj.x + obj.width * j, 
              obj.y + obj.height * i,
              obj.width,
              obj.height
            ));
            break;
        }

      }
    }

    return myArray;
  }
}

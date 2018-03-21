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
    $('#' + id).append(this.ctx);

    $.extend($.jCanvas.defaults, {
      fromCenter: false,
    });

    this.x = 0;
    this.y = 0;



    // BINDING METHOD

    this.update = this.update.bind(this);
    this.preload = this.preload.bind(this);
    this.play = this.play.bind(this);
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
    this.coin = new Sprite('coin', 0, 0, 100, 100, 
    {
      source: '/img/sprites/coin-sprite-animation.png',
      offSetX: 100, 
      offSetY: 0,

      numberFrame: 10,
      
      frames: 3
    });
  

  this.coin2 = new Sprite('coin', 200, 200, 100, 100, 
    {
      source: '/img/sprites/coin-sprite-animation.png',
      offSetX: 100, 
      offSetY: 0,

      numberFrame: 10,
      
      frames: 5
    });
  }


  update(frameStart) {
    const frame = frameStart; //Math.floor((Date.now() - frameStart) / 100)
    


    this.ctx.clearCanvas();
    this.x++;
    this.y++;
    

    //console.log(coin.getImg());
    const offSet = this.coin.getOffset(frame);

    this.ctx.drawImage({
      source: this.coin.getImg(),
      sWidth: 100,
      sHeight: 100,
      sx: offSet.sx, sy: offSet.sy
    });

    const offSet2 = this.coin2.getOffset(frame);
    this.ctx.drawImage({
      x: 200,
      source: this.coin2.getImg(),
      width: 50,
      height: 50,
      sWidth: 100,
      sHeight: 100,
      sx: offSet2.sx, sy: offSet2.sy
    });
  }
}


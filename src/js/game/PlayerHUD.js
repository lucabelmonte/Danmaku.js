class PLayerHUD extends Sprite {
  constructor(id, type, x, y, width, height){
    super({
      name: 'PLayerHUD' + id, 
      x, y, width, height,
      img: '/img/sprites/spritesheet_hud.png',
      realWidth: 125, realHeight: 125,


      offSetX: 125, offSetY: 125,
      nx: 0, ny: type + 2
    });
  }
}

class Heart extends PLayerHUD {
  constructor(id, type, x, y, player){
    super('Hearth', type, 0, 0, 20, 20);

    this.player = player;

    this.playerPOS = this.playerPOS.bind(this);
    setInterval(this.playerPOS, 20);
  }

  playerPOS() {
    this.y = this.player.y - 40;
    this.x = this.player.x + this.player.width / 5;
  }
}
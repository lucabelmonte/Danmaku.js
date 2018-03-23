class Entity{
  constructor(obj) {
    this._info = {
      name: obj.name,

      img: obj.img,

      x: obj.x || 0,
      y: obj.y || 0,

      width : obj.width  || 0,
      height: obj.height || 0,
      realWidth:  obj.realWidth   || 0,
      realHeight: obj.realHeight  || 0,

      
    }

    // BINDING
    this.click = this.click.bind(this);
  }

  animation() {
    // overloading
  }

  click(){
    // overloading
    console.log(this.y);
  }

  checkCollision(){
    
  }

  /*
  * GETTER AND SETTER 
  */

  get pos(){
    return {
      x: this._info.x,
      y: this._info.y
    }
  }

  get x(){
    return this._info.x;
  }

  get y(){
    return this._info.y;
  }

  set x(x){
    this._info.x = x;
  }

  set y(y){
    this._info.y = y;
  }

  // --

  get dim() {
    return {
      width:  this._info.width,
      height: this._info.height
    }
  }

  get width(){
    return this._info.width;
  }

  get realWidth(){
    return this._info.realWidth;
  }


  get height(){
    return this._info.height;
  }

  get realHeight(){
    return this._info.realHeight;
  }

  set width(w){
    this._info.width = w;
  }

  set height(h){
    this._info.height = h;
  }

  // --

  get img() {
    return this._info.img;
  }

  set img(img) {
    this._info.img = img;
  }

  get name() {
    return this._info.name;
  }
  
}
class Sprite {
  constructor(name, x, y, width, height, imgInfo){
    this.name = name;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.imgInfo = imgInfo;

    this.offSet = {
      x: 0,
      y: 0
    }
  }

  getPos(){
    return {
      x: this.x,
      y: this.y
    }
  }

  getImg(){
    return this.imgInfo.source;
  }

  getOffset(frame){

    if(this.imgInfo.frames != 0){
      if(frame % this.imgInfo.frames == 0){
        
        if(this.offSet.x == (this.imgInfo.numberFrame - 1)) this.offSet.x = 0;
        else this.offSet.x++;
        if(this.offSet.y == (this.imgInfo.numberFrame - 1)) this.offSet.y = 0;
        else this.offSet.y++;
       }
    }

    

    
    

    return {
      sx: (this.offSet.x * this.imgInfo.offSetX),
      sy: (this.offSet.y * this.imgInfo.offSetY)
    }
  }
}


// utility function

const parseXY = (type) => { // x:y
  type += '';
  return [
    parseInt(type.split(':')[0]),
    parseInt(type.split(':')[1])
  ];
}




$(() => {
  SCREEN_W = 	1000;
  SCREEN_H =     600;
  const x = new Danmaku('app', SCREEN_W, SCREEN_H);
  x.play();
})
// utility function

const parseXY = (type) => { // x:y
  type += '';
  return [
    parseInt(type.split(':')[0]),
    parseInt(type.split(':')[1])
  ];
}




$(() => {
  const x = new Danmaku('app', 1000, 600);
  x.play();
  
  
  
})
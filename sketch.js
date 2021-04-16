var balloon, balloonImage1;
var database, balloonposition;

function preload(){
    database = firebase.database();
    bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

function setup() {
  createCanvas(1000,640);
  balloon = createSprite(500,300, 50, 50);
  balloon.addAnimation("hotAirBalloon", balloonImage1);   
  balloon.scale = 0.01;


  var ballposition = database.ref("balloon/height");
  ballposition.on("value", readPosition, showError);
}

function draw() {
  background(bg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
  writePosition(-10, 0);
  }

  else if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0);
                                                              
  }

  else if(keyDown(UP_ARROW)){
    if (balloon.scale <1){ writePosition(0, -10); }
    if (balloon.scale >0.1){ balloon.scale = balloon.scale-0.05;}
  } 

  else if(keyDown(DOWN_ARROW)){ writePosition(0, 10);
    if (balloon.scale <1){ balloon.scale = balloon.scale+0.05; }
  }

  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function writePosition(x, y){
database.ref('balloon/height').set({
  'x': balloon.x + x,
  'y': balloon.y + y,
})
}

function showError(){
  console.log("error");
}
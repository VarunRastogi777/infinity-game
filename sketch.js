var PLAY = 1;
var END = 0;
var gameState = PLAY ;
var score=0
var banana,bananaimage,obstacle,obstacleimage
var backgrounds,backgroundimage
var bananagroup,obstaclegroup
var monkey,monkeyanimation
var ground
var gameoverimage,gameover

function preload(){
  monkeyanimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaimage=loadImage("banana.png")
  obstacleimage=loadImage("stone.png")
  backgroundimage=loadImage("395e5325b9ddcbdd28c3915bdf64b713-1.jpg")
  gameoverimage=loadImage("Screenshot (7).png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  

  
  monkey=createSprite(50,430,50,50)
  monkey.addAnimation("monkeyani",monkeyanimation)
  monkey.scale=0.1
  
  ground=createSprite(250,464,500,10)
  ground.visible=false
  
  gameover=createSprite(250,265,50,50)
  gameover.addImage(gameoverimage)
  gameover.scale=0.5
  gameover.visible=false
  
  bananagroup=new Group();
  obstaclegroup=new Group();
  
}
function draw() {
  background(backgroundimage);
  console.log(monkey.y)

  
  if(gameState===1){

    camera.position.x=monkey.x
    camera.position.y=monkey.y

    if(keyDown("space")&& monkey.y>=404){
      monkey.velocityY=-14
    }
    monkey.velocityY=monkey.velocityY+1
    
    monkey.collide(ground)
    if(bananagroup.isTouching(monkey)){
      score=score+2
      bananagroup.destroyEach();
    }
      switch(score){
    case 10 : monkey.scale = 0.12 ;
             break ;
    case 20 : monkey.scale = 0.14 ;
             break ;
    case 30 : monkey.scale = 0.16 ;
             break ;
    case 40: monkey.scale = 0.18 ;
             break ; 
    default : break ;
      }
    if(obstaclegroup.isTouching(monkey)){
      score=score-2
      gameState=END
    }   
  }
  if(gameState===END){
    gameover.visible=true
    bananagroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
    obstaclegroup.setLifetimeEach(-1)
    bananagroup.setLifetimeEach(-1)
    monkey.collide(ground)
  
}
  banana();
  obstacle();
drawSprites();
    textSize(20);
  fill("white");
  text("SCORE: "+score,350, 50);
}
function banana(){
  if(frameCount%80===0){
  var banana=createSprite(550,random(340,430),50,50)
  banana.addImage(bananaimage)
  banana.scale=0.05 
  banana.velocityX=-10
  banana.lifetime = 60;
  bananagroup.add(banana)

  
  }
  
}
function obstacle(){
  if(frameCount%130===0){
    var obstacle=createSprite(random(450,650),440,50,50)
    obstacle.addImage(obstacleimage)
  obstacle.scale=0.15 
  obstacle.velocityX=-10
  obstacle.lifetime=60
  obstaclegroup.add(obstacle)
}
}
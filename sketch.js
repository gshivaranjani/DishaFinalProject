var bg,a1,a2,a3,a4,a5,a6,a7,a8,shooterImg,ss1Img,ss2Img,ss3Img,ss4Img,ss6Img,star1,bulletImg;
var shooter , obstacle;
var obstaclesGroup;
var score = 0;
var lifes = 3;
var star1,star2,star3;
var starFlag = true;
var previousScore = 0;
var blastImg;
var shooterSound,losing,win;

var bulletGroup;

function preload(){
  a1 = loadImage("images/a1.png");
  a2 = loadImage("images/a2.png");
  a3 = loadImage("images/a3.png");
  a4 = loadImage("images/a4.png");
  a5 = loadImage("images/a5.png");
  a6 = loadImage("images/a6.png");
  a7 = loadImage("images/a7.png");
  a8 = loadImage("images/a8.png");
  bg = loadImage("images/bg.jpg");
  shooterImg = loadImage("images/shooter.png");

  bulletImg = loadImage("images/bullet.PNG");

  star1 = loadImage("images/star1.PNG");
  star2 = loadImage("images/star2.png");
  star3 = loadAnimation("images/ss1.png","images/ss2.png","images/ss3.png","images/ss4.png","images/ss5.png","images/ss6.png");

  blastImg = loadAnimation("images/b1.png","images/b2.png","images/b3.png","images/b4.png");
  shooterSound = loadSound("sounds/hit.mp3");

}

function setup() {
  createCanvas(1200,700);

  
 
 shooter = createSprite(400, 640, 50, 50);
 shooter.addImage("shooter1",shooterImg);
 shooter.scale = 0.5;


 obstaclesGroup = new Group();
 bulletGroup = new Group();
}

function draw() {
  background(bg);
  shooterSound.play();
  textSize(20);
  fill("red");
  text("SCORE: "+score,100,20);
  
  if (lifes === 0) {
    textSize(40);
    fill("blue");
    text("GAME OVER",500,350);
  } else {

    if (obstaclesGroup.isTouching(shooter)) {
      obstaclesGroup.destroyEach();
      lifes = lifes - 1;
      
    }
  
    textSize(20);
    fill("red");
    text("LIFES : "+lifes,width-100,20);
  shooter.x = mouseX;

  if (keyWentDown("space")) {
    spawnBullet();
    
  }
  if (score>0 && score % 5 === 0 && starFlag) {
    spawnStar();
    starFlag = false;
    previousScore = score;
  }
  if (score>previousScore) {
    starFlag = true;
  }

  spawnObstacles();

  if (bulletGroup.isTouching(obstaclesGroup)) {
    bulletGroup.destroyEach();
    obstaclesGroup.destroyEach();
    score = score+1;
    var blast = createSprite(obstacle.x,obstacle.y,10,10);
      blast.addAnimation("blast",blastImg);
      blast.velocityY = -4;
      blast.lifetime = 200;
      

  }
} 
  drawSprites();
}

function spawnObstacles(){
  if (frameCount % 150 === 0) {
    obstacle = createSprite(Math.round(random(10,1100)),0,10,10);
    obstacle.velocityY = 2;
    var rand = Math.round(random(1,8));
    console.log(rand);

    switch (rand) {
      case 1: obstacle.addImage(a1);
        break;
        case 2: obstacle.addImage(a2);
        break;
        case 3: obstacle.addImage(a3);
        break;
        case 4: obstacle.addImage(a4);
        break;
        case 5: obstacle.addImage(a5);
        break;
        case 6: obstacle.addImage(a6);
        break;
        case 7: obstacle.addImage(a7);
        break;
        case 8: obstacle.addImage(a8);
        obstacle.scale = 0.3;
        break;
    
      default:
        break;
    }
    obstaclesGroup.add(obstacle);
  }
}
function spawnBullet(){
  var bullet = createSprite(shooter.x,620,20,50);
  bullet.velocityY = -5;
  bullet.lifetime = 235;
  bulletGroup.add(bullet);
  bullet.addImage("bullet",bulletImg);
  bullet.scale = 0.3
  shooter.play();
}
function spawnStar(){
  var star = createSprite(Math.round(random(0,400)),0,10,10);
  var rand = Math.round(random(1,3));
  console.log(rand);
  if (rand === 1) {
    star.x = 1200;
    star.addImage("star1",star1);
    star.velocityX = -5;
    star.velocityY = 2;
    star.lifetime = 300;
  }else if(rand === 2){
    star.x = 0;
    star.addImage("star2",star2);
    star.velocityX = 5;
    star.velocityY = 2;
    star.lifetime = 300;
  }else {
    star.x = 0;
    star.y = 200;
    star.addAnimation("ss",star3);
    star.velocityX = 5;
    star.lifetime = 250;
  }
  
}

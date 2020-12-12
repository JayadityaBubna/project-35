var dog,happyDog;
var dogImg,happyDogImg;
var database;
var foodS,foodStock
function preload(){
  
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(700,700);

  dog=createSprite(400,300,100,200)
  dog.addImage("dog",dogImg);
  dog.addImage("doghpy",happyDogImg);
  dog.scale=0.5;
  

  database=firebase.database();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    dog.changeImage("doghpy",happyDogImg);
    writeStock(foodS);
   
  }


  
  textSize(20);
  fill("red");
 
  text("FOOD STOCK:"+ foodS,50,70);
  text("Note: Press up arrow key to feed the dog milk!",50,15);

  drawSprites();

}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){
 
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({food:x});

}


//Create variables here
var Dog, dog, happyDog;
var database;
var foodS, foodStock;
var FeedDog, addFoods, addFood;
var fedTime, lastFed;
var foodObj;

var changeState,readState;
var bedroom, garden, washroom;

function preload(){
  //load images here

  dog = loadImage('dogImg.png');
  happyDog = loadImage('happydog.png');
  bedroom = loadImage('virtual pet images/Bed Room.png');
  garden = loadImage('virtual pet images/Garden.png');
  washroom = loadImage('virtual pet images/Wash Room.png');

}

function setup() {
  createCanvas(500, 500);
  Dog = createSprite(350,350,20,20);
  Dog.addImage(dog);
  database= firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  food = new Food();
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(FeedDog);
  
  //read gamestate from database;
  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

  addFood=createButton("addFood");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);
  //add styles here
  textSize(20);
  fill("green")
  stroke();
  text("FOOD LEFT: "+ foodS, 350,400);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Feed : "+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed==0){
    text("last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : "+lastFed + "AM", 350, 30);
  }

  if(gameState!= "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog)
  }
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.bedroom();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  display();
  AddFoodS();
  feedDog();
  drawSprites();

}
function addFoods(){
  foodS++;
  database.ref('/'.update({
    Food:foodS
  }))
  if(mousePressed(addFood)){
    foodStock = foodStock + 1;

  }
}

function feedDog(){
  if(mousePressed(feed)){
    hour();
    dog.addImage(happyDog);
    foodStock = foodStock - 1;
    foodObj.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()

})
  }
}
//Function to read values from DB;
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB;
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}






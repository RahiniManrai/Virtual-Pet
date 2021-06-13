var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  FeedDog=createButton("Feed the Dog")
  FeedDog.position(850, 95)
  FeedDog.mousePressed(FeedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  database.ref('FeedTime').on("value", function(data){
    FeedTime=data.val();
  })
  
 
  
  
 
  drawSprites();
}   

database.ref(foodStock).on("value", function(data){
  foodStock=data.val();
})
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  database.ref('/').update({foodStock})
    if(lastFeed>=12){
  //show time in PM format when lastFeed is geater than 12
  }else if(lastFeed==0){
    text("LastFeed : 12am", 350, 30)
  }else{
    //show time in AM format when lastFeed is less than 12
  }


}

var food_stock_val=foodObj.getfoodStock();
if(food_stock_val<=0){
  foodObj.updatefoodStock(food_stock_val *0);
}else{
  foodObj.updatefoodStock( food_stock_val -1);
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

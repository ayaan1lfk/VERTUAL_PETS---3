var milkImage,milk;
var getFoodStock, updateFoodStock, deductFood;
milk = createSprite(250,250,10,10);
function preload(){
    milkImage = loadImage("Milk.png")
}

class Food{
    constructor(){
        var foodStock, lastFed;

    }
    
}

function display(){
    var x=80,y=100;

    imageMode(CENTER);
    image(this.image, 720, 220, 70, 70);

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}


function bedroom(){
    background(bedroom,550,500);
}

function garden(){
    background(garden,550,500);
}

function washroom(){
    background(washroom,550,500);
}





































































































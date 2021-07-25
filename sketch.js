var player ,playerImg, platformsLeft,platformsRight,platformsImg ,platformsLeftGroup,platformsRightGroup ,invisibleGround;
var lava , lavaImg ,bg , leftEdge,rightEdge,topEdge,back;
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var restart ,gameOver;

function preload(){
    playerImg = loadAnimation('run 0.png','run 1.png','run 2.png','run 3.png','run 4.png');
    platformsImg = loadImage('images/planet.png');
    bg = loadImage('images/spacenack.png');
}

function setup(){
    createCanvas(500,1000);

    
    back = createSprite(0,100,500,1000);
    back.addImage(bg);
    back.scale = 3;

    player = createSprite(250,800,50,100);
    player.addAnimation('playerrunning',playerImg);

    invisibleGround = createSprite(250,900,500,10);

    platformsLeftGroup = new Group();
    platformsRightGroup = new Group();

    invisibleGround.visible = false;

    leftEdge = createSprite(0,500,10,1000);
    rightEdge = createSprite(500,500,10,1000);
    topEdge  =createSprite(250,0,500,10);

}

function draw(){
    background(255);
    stroke(255);
    textSize(30);
    textFont('ArialBold');

        
        if(gameState === START){
            player.visible = false; 

            var heading=createElement('h1'); 
            heading.html('Run on the planets'); 
            heading.position(200,500); 

            var tell=createElement('h2'); 
            tell.html("Click on play nowww!!!"); 
            tell.position(200,650);

            var button=createButton("Play"); 
            button.position(300,600); 
            button.mousePressed(()=>{
             removeElements(); 
             gameState=PLAY; 
            })

        }
        if(gameState === PLAY){
            player.visible = true;
            back.visible = true;

            player.collide(invisibleGround);
            player.collide(leftEdge);
            player.collide(rightEdge);
            player.collide(topEdge);
            player.collide(platformsLeftGroup);
            player.collide(platformsRightGroup);

            if(keyDown(32)){
                player.velocityY = -10;
                invisibleGround.destroy();
            }
            player.velocityY += 1; 
 
            if(keyDown(LEFT_ARROW)){
                player.velocityX = -10;
            }
        
            if(keyDown(RIGHT_ARROW)){
                player.velocityX = 10;
            }
        
            if(player.y >= 900){
                text('Game Over',250,500);
                gameState = END
            }
            spawnplatforms();
        }
        if(gameState === END){
           platformsRightGroup.setVelocityYEach(0);
           platformsLeftGroup.setVelocityYEach(0);

            var tell=createElement('h1'); 
            tell.html("Thank you for playing"); 
            tell.position(200,500);

            var tell=createElement('h2'); 
            tell.html("To play again click on restart"); 
            tell.position(200,650);

            var button=createButton("Restart"); 
            button.position(300,600); 
            button.mousePressed(()=>{
             removeElements(); 
                restart();
            })

        }
    
     
    drawSprites();
    
    
}

function spawnplatforms(){
   if(frameCount % 150 ===0 ){
       var randomY  = random(50,100);

       platformsLeft = createSprite(50,randomY+25);
       platformsLeft.addImage(platformsImg);
       platformsLeft.scale=3/4;
        platformsLeft.velocityY = 2.5;
        platformsLeft.lifetime = 500;

        platformsRight = createSprite(450,randomY+100);
        platformsRight.addImage(platformsImg);
        platformsRight.scale=3/4;
        platformsRight.velocityY = 2.5;
        platformsRight.lifetime = 500;

        platformsLeftGroup.add(platformsLeft);
        platformsRightGroup.add(platformsRight);
   }
}

function restart(){
    gameState = PLAY;

    player.x = 250;
    player.y = 800;

    platformsRightGroup.destroyEach(0);
    platformsLeftGroup.destroyEach(0);

    invisibleGround = createSprite(250,900,500,10);
    invisibleGround.visible = false;
}
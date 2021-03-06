/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
var canvas = document.getElementById("pongCourt");
var ctx = canvas.getContext("2d");
var score = 0;
var speed = 30;
var pixelRatio = window.devicePixelRatio;

canvas.width  = window.innerWidth * pixelRatio; //set canvas width to device's screen width
canvas.height = window.innerHeight * pixelRatio; //set canvas height to device's screen height

canvas.style.width = window.innerWidth + 'px';   /// CSS size of canvas
canvas.style.height = window.innerHeight + 'px';

var rasta_gradient = ctx.createLinearGradient(0,0,0,canvas.height);
rasta_gradient.addColorStop(0,"green");
rasta_gradient.addColorStop(0.5,"yellow");
rasta_gradient.addColorStop(1,"red");
ctx.fillStyle = rasta_gradient;

bricks = [];

greenBrick = new Image();
greenBrick.src = "img/pot_leaf_green-128.png";

yellowBrick = new Image();
yellowBrick.src = "img/pot_leaf_yellow-128.png";

redBrick = new Image();
redBrick.src = "img/pot_leaf_red-128.png";

var brick = {green:greenBrick, yellow:yellowBrick, red:redBrick}; 

joint = new Image();
joint.src = "img/joint.png";


var wall = {
    wide: 2,
    high: 30,  
    leftX: 5,
    leftY: 5, 
    rightX: canvas.width - 7,
    rightY: 5,        
    topX: 5,
    topY: 5,
    topWide: canvas.width - 10
};     
    
paddle = {    
    wide: 200,
    high: 50,
    x: canvas.width/2,
    y: canvas.height * 4 / 5
};

var ball = {
    xMove: 6,
    yMove: 6,
    size: 25,
    x: canvas.width/2,
    y: canvas.height/2,
    
    move: function () {
        ctx.clearRect(ball.x, ball.y, ball.size, ball.size);
        ctx.clearRect(paddle.x, paddle.y, paddle.wide, paddle.high);
        
        ball.x = ball.x + ball.xMove;
        ball.y = ball.y + ball.yMove;
        
        //check if ball is hitting left or right wall
        if(ball.x + ball.size >= wall.rightX || ball.x <= wall.leftX + wall.wide){
            ball.xMove = -ball.xMove;
        }
     
        //check if ball is hitting ceiling
        if(ball.y <= wall.topY + wall.high){
            ball.yMove = -ball.yMove;
        }
        
        //check if ball is hitting floor and increment score
        if(ball.y >= canvas.height + ball.size) {
            ball.yMove = -ball.yMove;
            navigator.vibrate(50);
            score++;
            ball.x = canvas.width/2;
            ball.y = canvas.height/2;
        } 
       
        //check if ball is hitting paddle
        if(ball.y + ball.size >= paddle.y &&
            ball.y <= paddle.y + 5 &&
            ball.x <= paddle.x + paddle.wide &&
            ball.x + ball.size >= paddle.x &&
            ball.yMove > 0){
            ball.yMove = -ball.yMove;
        }

        
        drawCourt();
    }
};

//iOS = true;
if(iOS) {        
    wall.wide = 5;
    wall.high = 50;
    wall.leftX = 0;
    wall.leftY = 0;
    wall.rightX = canvas.width - 5;
    wall.rightY = 0;
    wall.topX = 0;
    wall.topY = 0;
    wall.topWide = canvas.width;

    //ball.xMove = 2;
    //ball.yMove = 2;
    ball.size = 25;
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;  
    
}

function initialize() {
    document.addEventListener('deviceready', function() {
        drawCourt();
        drawBrix();
        //ctx.fillStyle = 'white';
        ctx.fillText('Touch to Begin', (canvas.width/2) , 400);
        $("canvas").on("touchstart", function(){
            $("canvas").off("touchstart");
            interval = setInterval(function () {ball.move()}, speed);
        

            $("canvas").on("touchmove", function(ev){
                var e = ev.originalEvent;
                var x = e.touches[0].screenX;
                var y = e.touches[0].screenY;
                if(x < paddle.x + paddle.wide * 2 &&
                   x > paddle.x - paddle.wide &&
                   y < canvas.height &&
                   y > paddle.y &&
                   x + paddle.wide/2 < wall.rightX &&
                   x - paddle.wide/2 > wall.leftX + wall.wide ) {
                     console.log('true');
                     paddle.x = x - paddle.wide/2;
                }
            });
        });    
    });
}

function drawCourt() {
    
    //draw walls
    //ctx.fillStyle = "#AA00FF"; //set color purple to initialize walls
    ctx.fillRect(wall.leftX, wall.leftY, wall.wide, canvas.height); //draw left wall
    ctx.fillRect(wall.rightX, wall.rightY, wall.wide, canvas.height); //draw right wall


    ctx.fillRect(wall.topX, wall.topY, wall.topWide, wall.high); //draw ceiling to match statusbar   
    //draw ball
    //ctx.fillStyle = "#00FF00"; //set color green to initialize ball and paddle
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size); //draw the ball's initial position


    ctx.drawImage(joint, paddle.x, paddle.y, paddle.wide, paddle.high); //draw the paddle's initial position

    //draw textbox to show score
    //ctx.fillStyle = "black";
    ctx.font = "20px Courier New";
    ctx.fillText('Deaths:' + score, wall.leftX + wall.wide + 5, wall.topY + wall.high - 5 );

}

function drawBrix() {
    //draw brix
    var brickSize = 75;
    var inset = ((canvas.width - (canvas.width - wall.rightX)) - (wall.leftX + wall.wide));
    var bricksNum = parseInt(inset/brickSize);
    var bricksWidth = brickSize * bricksNum;
    var offset = (inset - bricksWidth) / 2     
    var y = wall.topY + wall.high + brickSize;
    var b = 0;
    for ( b in brick) { 
        var x = wall.leftX + wall.wide;
        while(x < wall.rightX - brickSize) {
            ctx.drawImage(brick[b], x + offset, y, brickSize, brickSize);
            x = x + brickSize;        
        }   
        y = y + brickSize;
    }
}
    

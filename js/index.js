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
var speed = 10;
var interval = null;

canvas.width  = window.innerWidth; //set canvas width to device's screen width
canvas.height = window.innerHeight; //set canvas height to device's screen height

var wall = {
    wide: 2,
    high: 2,  
    leftX: 5,
    leftY: 5, 
    rightX: canvas.width - (this.wide + 5),
    rightY: 5,        
    topX: 5,
    topY: 5,
    topWide: canvas.width - 10
};     
    
var paddle = {
    wide: 50,
    high: 10,
    x: canvas.width/2,
    y: canvas.height * 9 / 10
};

var ball = {
    xMove: 1,
    yMove: 1,
    size: 10,
    x: canvas.width/2,
    y: canvas.height/2,
    
    move: function () {
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
iOS = true;
if(iOS) {        
    wall.wide = 2;
    wall.high = 20;
    wall.leftX = 0;
    wall.leftY = 0;
    wall.rightX = canvas.width - 2;
    wall.rightY = 0;
    wall.topX = 0;
    wall.topY = 0;
    wall.topWide = canvas.width;

    paddle.wide = 70;
    paddle.high = 10;
    paddle.x = canvas.width/2;
    paddle.y = (canvas.height * 9 / 10);

    ball.xMove = 1;
    ball.yMove = 1;
    ball.size = 10;
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;  
    
}

function initialize() {
    document.addEventListener('deviceready', function() {
        drawCourt();
        $("canvas").on("touchdown mousedown", function(){
            $("canvas").off("touchdown mousedown");
            interval = setInterval(function () {ball.move()}, speed);
            console.log('touchdown!');
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
                    paddle.x = x - paddle.wide/2;
                }
            });
        
        });
        
    });
}

function drawCourt() {
    //clear the screen before drawing more
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw walls
    ctx.fillStyle="#AA00FF"; //set color purple to initialize walls
    ctx.fillRect(wall.leftX, wall.leftY, wall.wide, canvas.height); //draw left wall
    ctx.fillRect(wall.rightX, wall.rightY, wall.wide, canvas.height); //draw right wall
    ctx.fillRect(wall.topX, wall.topY, wall.topWide, wall.high); //draw ceiling to match statusbar   
    //draw ball
    ctx.fillStyle="#00FF00"; //set color green to initialize ball and paddle
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size); //draw the ball's initial position
    ctx.fillRect(paddle.x, paddle.y, paddle.wide, paddle.high); //draw the paddle's initial position

    //draw textbox to show score
    ctx.font="20px Courier New";
    ctx.fillText('Deaths: ' + score, 100, 100);
}



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

//check if ios before drawing ceiling to adjust for statusbar
if(iOS) {
    var wall = {
            
        leftX:0,
        leftY:0,
                   
        rightX:canvas.width,
        rightY:0,
                        
        topX:0,
        topY:0,
        topWidth:canvas.width,
            
        width:2,
        height:20
                        
    };     
}
else {
    var wall = {
        
        leftX:5,
        leftY:5,
        
            
        rightX:canvas.width,
        rightY:5,
           
        topX:5,
        topY:5,
        topWidth:canvas.width,
            
        width:5,
        height:5   
    
    };
}
    

color = "#00FF00";
createCourt();
     
// Application Constructor
function initialize() {        
    this.bindEvents();
}
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
function bindEvents() {
    document.addEventListener('deviceready', function() {
        receivedEvent('ready');
        $("canvas").on("touchstart",function(){
            $("canvas").on("touchmove",function(ev){
                //onClick();
                var e = ev.originalEvent;
                var x = e.touches[0].screenX;
                var y = e.touches[0].screenY;
                if(x < paddle.x + paddle.width * 2 &&
                   x > paddle.x - paddle.width &&
                   y < canvas.height &&
                   y > paddle.y &&
                   x + paddle.width/2 < canvas.width - 10 &&
                   x - paddle.width/2 > 10 ) {
                    paddle.x = x - paddle.width/2;
                    
                    
            
                }
            });
        });     
    });
}

// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicitly call 'app.receivedEvent(...);'

// Update DOM on a Received Event
function receivedEvent(id) {
    var speed = 1;

    interval = setInterval(function () {ball.move();}, speed);
    console.log('Received Event: ' + id);
}

function onClick() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
        console.log('tap');

}




function createCourt() {
    canvas.width  = window.innerWidth; //set canvas width to device's screen width
    canvas.height = window.innerHeight; //set canvas height to device's screen height
    ctx.fillStyle= color; //set color green to initialize ball
    
}

function drawCourt() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the screen before drawing more

    ctx.fillStyle="#AA00FF"; //set color purple to initialize walls
    ctx.fillRect(wall.leftX, wall.leftY, wall.width, canvas.height); //draw left wall
    ctx.fillRect(wall.rightX, wall.rightY, wall.width, canvas.height); //draw right wall
    ctx.fillRect(wall.topX, wall.topY, wall.topWidth, wall.height); //draw ceiling to match statusbar   

    ctx.fillStyle="#00FF00"; //set color green to initialize ball and paddle
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size); //draw the ball's initial position
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height); //draw the paddle's initial position

}

var paddle = {
    width:50,
    height:10,
    x:(canvas.width/2),
    y:canvas.height - (canvas.height/10)
};

var ball = {
    xMove:1,
    yMove:1,
    size:20,
    x:canvas.width/2,
    y:canvas.height/2,

    move: function() {
        ball.x = ball.x + ball.xMove;
        ball.y = ball.y + ball.yMove;
        
        //check if ball is hitting left or right wall
        if(ball.x + ball.size >= wall.rightX || ball.x <= wall.leftX + wall.width){
            ball.xMove = -ball.xMove;
//            navigator.vibrate(50);
        }
        //check if ball is hitting ceiling or floor
        if(ball.y <= wall.topY + wall.height){
            ball.yMove = -ball.yMove;
            //navigator.vibrate(50);
        }
        
        if(ball.y >= canvas.height + ball.size) {
            ball.yMove = -ball.yMove;
            navigator.vibrate(50);
            score++;
            console.log(score);
        } 
        
        //check if ball is hitting paddle
        if(ball.y + ball.size >= paddle.y &&
           ball.y <= paddle.y + 5 &&
           ball.x <= paddle.x + paddle.width &&
           ball.x + ball.size >= paddle.x &&
           ball.yMove > 0){
            ball.yMove = -ball.yMove;
//            navigator.vibrate(50);
        }
        
        
        drawCourt();
    }
};

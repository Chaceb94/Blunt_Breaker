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

color = "#00FF00";
createCourt();
     
var app = {
    // Application Constructor
    initialize: function() {        
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
//        document.addEventListener('click', this.onClick, false);
        $("canvas").on("tap",function(){
            app.onClick();
            console.log('touch');
        });
      
      
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('ready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var speed = 1;

        interval = setInterval(function () {ball.move();}, speed);
        console.log('Received Event: ' + id);
    },
    onClick: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
        console.log('tap');
        if (color == "#FF0000"){
            color = "#00FF00";
        }
        else if (color == "#00FF00"){
            color = "#FF0000";
        }
        ctx.fillStyle = color;
            
        
    }
};



function createCourt() {
    canvas.width  = window.innerWidth; //set canvas width to device's screen width
    canvas.height = window.innerHeight; //set canvas height to device's screen height
    ctx.fillStyle= color; //set color green to initialize ball
    
}

function drawCourt() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the screen before drawing more

//    ctx.fillStyle="#AA00FF"; //set color purple to initialize boundaries
    ctx.fillRect(5, 5, 5, canvas.height); //draw left wall
    ctx.fillRect(canvas.width-10, 5, 5, canvas.height); //draw right wall
    
    //check if ios before drawing ceiling to adjust for statusbar
    if(iOS) {
        ctx.fillRect(0, 0, canvas.width, 20); //draw ceiling to match statusbar        
    }
    else {
        ctx.fillRect(5, 5, canvas.width-10, 5); //draw ceiling for no statusbar
    }

//    ctx.fillStyle="#00FF00"; //set color green to initialize ball
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
        if(ball.x >= canvas.width - ball.size - 10 || ball.x <= 10){
            ball.xMove = -ball.xMove;
//            navigator.vibrate(50);
        }
        //check if ball is hitting ceiling or floor
        if(ball.y >= canvas.height + ball.size || ball.y <= 10){
            ball.yMove = -ball.yMove;
            //navigator.vibrate(50);
        }
        //check if ball is hitting paddle
        if(ball.y + ball.size == paddle.y &&
           ball.x <= paddle.x + paddle.width &&
           ball.x + ball.size >= paddle.x &&
           ball.yMove > 0){
            console.log('yes');
            ball.yMove = -ball.yMove;
//            navigator.vibrate(50);
        }
        
        drawCourt();
    }
};

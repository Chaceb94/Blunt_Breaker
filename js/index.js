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

var canvas = document.getElementById("pongCourt");
var ctx = canvas.getContext("2d");

var app = {
    // Application Constructor
    initialize: function() {
        createCourt();
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
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
        var speed = 10;

        interval = setInterval(function () {ball.move();}, speed);
        console.log('Received Event: ' + id);
    }
};



function createCourt() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawCourt() {
    ctx.fillStyle="#00FF00";
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

var paddle = {
    width:50,
    height:10,
    x:(canvas.width/2),
    y:(canvas.height)
};

var ball = {
    xMove:2,
    yMove:2,
    size:20,
    x:canvas.width/2,
    y:canvas.height/2,

    move: function() {
        this.x = this.x + this.xMove;
        this.y = this.y + this.yMove;
        if(ball.x >= canvas.width - this.size || ball.x <= 0){
            this.xMove = -this.xMove;
            navigator.vibrate(50);
        }
        if(ball.y >= canvas.height - this.size || ball.y <= 0){
            this.yMove = -this.yMove;
            navigator.vibrate(50);
        }
        drawCourt();
    }
};

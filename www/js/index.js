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

var app = {
    // Application Constructor
    initialize: function() {
        createCourt();
        interval = setInterval(function () {move();}, speed);
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('click', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceReady');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.removeEventListener('click', this.onDeviceReady, false);
        
        var parentElement = document.getElementById(id);
        var receivedElement = parentElement.querySelector('.court');        

        receivedElement.setAttribute("style", "display: block");
        console.log('Received Event: ' + id);
    }
};

function createCourt(){
    speed = 10;
    xMove = 2;
    yMove = 2;
    ballSize = 20;
    paddleWidth = 10;
    paddleHeight = 50;
    court = document.getElementById("pongCourt");
    ctx = court.getContext("2d");
    court.width  = window.innerWidth;
    court.height = window.innerHeight;
    ctx.fillStyle="#00FF00";
    x = court.width/2;
    y = court.height/2;
    ctx.fillRect(x,y,ballSize,ballSize);
    ctx.fillRect(court.width/100,court.height/2,paddleWidth,paddleHeight);
    ctx.fillRect(((court.width/100)*99)-paddleWidth,court.height/2,paddleWidth,paddleHeight);
}

function move(){
    x = x + xMove;
    y = y + yMove;
    if(x >= court.width - ballSize || x <= 0){
        xMove = -xMove;
        navigator.vibrate();
    }
    if(y >= court.height - ballSize || y <= 0){
        yMove = -yMove;
        console.log(navigator.vibrate(200));
    }
    ctx.clearRect(0,0,court.width,court.height);
    ctx.fillRect(x,y,ballSize,ballSize);
}

app.initialize();

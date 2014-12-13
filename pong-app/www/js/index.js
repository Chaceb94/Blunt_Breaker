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

var x = 100;
var y = 100;
var speed = 10;
var xMove = 1;
var yMove = 1;
var ballSize = 20;

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
        var parentElement = document.getElementById(id);
        var receivedElement = parentElement.querySelector('.cnvs');        
        
        
        
        receivedElement.setAttribute("style", "display: block");
        interval = setInterval(function () {app.move();}, speed);
        //app.move();
        console.log('Received Event: ' + id);
    },
    
    move: function(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        x = x + xMove;
        y = y + yMove;
        if(x >= canvas.width - ballSize || x <= 0) xMove = -xMove;
        if(y >= canvas.height - ballSize || y <= 0) yMove = -yMove;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#00FF00";
        ctx.fillRect(x,y,ballSize,ballSize);
    }

};

app.initialize();

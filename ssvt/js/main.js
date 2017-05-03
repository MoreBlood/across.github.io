// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function() {
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {

    var coin,
        coinImage,
        canvasBird,
        canvasSky;

    function gameLoop () {

        window.requestAnimationFrame(gameLoop);

        coin.update();
        coin.render();
    }

    function sprite (options) {

        var that = {},
            frameIndex = 0,
            frameIndexVertical = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1,
            rows = options.rows,
            columns = options.columns,
            currentFrame = 1,
            posX = canvasBird.width,
            posY = canvasBird.height;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

                tickCount = 0;




                // If the current frame index is in range
                if (currentFrame < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                    currentFrame += 1;
                }

                else {
                    frameIndex = 0;
                    frameIndexVertical = 0;
                    currentFrame = 0;
                }

                if (currentFrame % columns  === 0 && currentFrame != 0){
                    frameIndexVertical += 1;
                    frameIndex = 0;
                }



            }
        };

        that.render = function () {

            // Clear the canvas
            that.context.clearRect(0, 0, canvasBird.width, canvasBird.height);
            posX -= canvasBird.width /100;
            posY -= canvasBird.height / 100;


            if (posX < - that.width / columns || posY < - that.height/rows)
            {
                posX = canvasBird.width;
                posY = canvasBird.height;
            }
            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / columns,
                frameIndexVertical * that.height/rows,
                that.width / columns,
                that.height / rows,
                posX,
                posY,
                that.width / columns,
                that.height / rows);
        };

        return that;
    }

    // Get canvas
    canvasBird = document.getElementById("bird");
    canvasBird.width = window.innerWidth;
    canvasBird.height = window.innerHeight;

    canvasSky = document.getElementById("sky");
    canvasSky.width = window.innerWidth;
    canvasSky.height = window.innerHeight;

    var contextSky = canvasSky.getContext("2d");

    // Create sprite sheet
    coinImage = new Image();

    // Create sprite
    coin = sprite({
        context: canvasBird.getContext("2d"),
        width: 1200,
        height: 1570,
        image: coinImage,
        numberOfFrames: 22,
        ticksPerFrame: 1,
        rows: 5,
        columns: 5
    });


    var particles = d3.range(2000).map(function(i) {
        return [Math.round( canvasSky.width *Math.random()), Math.round(canvasSky.height*Math.random())];
    });

    d3.timer(step);

    function step() {
        contextSky.clearRect(0,0,canvasSky.width,canvasSky.height);
        particles.forEach(function(p) {

            p[0] += Math.round(2*Math.random()-1);
            p[1] += Math.round(2*Math.random()-1);
            if (p[0] < 0) p[0] = canvasSky.width;
            if (p[0] > canvasSky.width) p[0] = 0;
            if (p[1] < 0) p[1] = canvasSky.height;
            if (p[1] > canvasSky.height) p[1] = 0;
            drawPoint(p);
        });
    };

    function drawPoint(p) {

        var randomOpacityOne = Math.floor((Math.random()*9)+1);
        var randomOpacityTwo = Math.floor((Math.random()*9)+1);
        var randomHue = Math.floor((Math.random()*360)+1);
        var randomSize = Math.floor((Math.random()*3)+1);
        contextSky.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
        contextSky.shadowColor = "white";
        contextSky.fillRect(p[0],p[1],randomSize,randomSize);
    };

    // Load sprite sheet
    coinImage.addEventListener("load", gameLoop);
    coinImage.src = "img/robin.png";

} ());


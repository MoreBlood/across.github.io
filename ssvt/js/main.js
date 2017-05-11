(function () {

    var coin,
        coinImage,
        canvasBird,
        canvasSky,
    check = false;

    function gameLoop() {

        window.requestAnimationFrame(gameLoop);

        coin.update();
        coin.render();
        step();

    }

    function sprite(options) {

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
            posY = 100;

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

                if (currentFrame % columns === 0 && currentFrame != 0) {
                    frameIndexVertical += 1;
                    frameIndex = 0;
                }


            }
        };

        that.render = function () {

            // Clear the canvas
            that.context.clearRect(0, 0, canvasBird.width, canvasBird.height);

            if (!check) {
                posX += canvasBird.width / 100;
            }if (check) {
                posX -= canvasBird.width / 100;
            }


            if (posX > canvasBird.width){
                    posX = canvasBird.width - 100;
                check = true;
                that.image = new Image();
                that.image.src = "img/robin.png";
            }if (posX < 0){
                posX = 0;
                check = false;
                that.image = new Image();
                that.image.src = "img/robin_mir.png";
                //that.context.scale(1,-1);


            }
            // Draw the animation

            that.context.drawImage(
                that.image,
                frameIndex * that.width / columns,
                frameIndexVertical * that.height / rows,
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


    var particles = d3.range(canvasSky.width / 10).map(function (i) {
        return [Math.round(canvasSky.width * Math.random()), Math.round(canvasSky.height * Math.random())];
    });
    var pos = 0;
    var pos2 = 0;


    function step() {
        contextSky.clearRect(0, 0, canvasSky.width, canvasSky.height);
        particles.forEach(function (p) {

            p[0] += Math.round(2 * Math.random() - 1);
            p[1] += Math.round(2 * Math.random() - 1);
            drawPoint(p);
        });
        pos += canvasBird.width / 150;
        pos2 += canvasBird.height / 150;
        //contextSky.blur(5);
        contextSky.fillRect(pos, pos2, 5, 5    );
        if (pos2 > canvasBird.height){
            pos = 0;
            pos2 =0;

        }
        $('#bird').click(function (e) { //Default mouse Position
            pos = e.pageX;
            pos2 =e.pageY;
        });


    };

    function drawPoint(p) {

        var randomOpacityOne = Math.floor((Math.random() * 9) + 1);
        var randomOpacityTwo = Math.floor((Math.random() * 9) + 1);
        var randomHue = Math.floor((Math.random() * 360) + 1);
        var randomSize = Math.floor((Math.random() * 3) + 1);
        contextSky.fillStyle = "hsla(" + randomHue + ", 30%, 80%, ." + randomOpacityOne + randomOpacityTwo + ")";
        contextSky.shadowColor = "white";
        contextSky.fillRect(p[0], p[1], randomSize, randomSize);
    };

    // Load sprite sheet
    coinImage.addEventListener("load", gameLoop);
    coinImage.src = "img/robin.png";

}());


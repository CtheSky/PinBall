/**
 * Created by CtheSky on 2016/11/9.
 */

// Get canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set canvas offset
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

// Represent mouse axis in canvas
var startX;
var startY;

// Represent current dragged image
var draggingImage = null;

// Image Array
var draggableImageArray = [];

// Draggable Object
var Draggable = function(b2PropDef, imageProp){
    this.b2FixtureDef = b2PropDef.fixDef;
    this.b2BodyDef = b2PropDef.bodyDef;
    this.imageX = imageProp.imageX;
    this.imageY = imageProp.imageY;
    this.imageWidth = imageProp.imageWidth;
    this.imageHeight = imageProp.imageHeight;

    var image = new Image();
    image.src = imageProp.imageSrc;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, image.width, image.height,
            imageProp.imageX, imageProp.imageY, imageProp.imageWidth, imageProp.imageHeight);
    };
    this.image = image;
};

// Draw draggableImage
function draw(draggableImage){
    var dg = draggableImage;
    var image = draggableImage.image;
    // draw the image
    ctx.drawImage(image, 0, 0, image.width, image.height,
        dg.imageX, dg.imageY, dg.imageWidth, dg.imageHeight);
}

// Draw division line between item panel and game panel
function drawDivision(){
    ctx.beginPath();
    ctx.moveTo(600, 0);
    ctx.lineTo(600, 400);
    ctx.closePath();
    ctx.stroke();
}

// Find clicked Image and set draggingImage to it
function hitImage(x, y) {
    for (var i = 0; i < draggableImageArray.length; i++) {
        var dg = draggableImageArray[i];
        if (x > dg.imageX &&
            x < dg.imageX + dg.imageWidth &&
            y > dg.imageY && y < dg.imageY + dg.imageHeight)
            return dg;
    }
    return null;
}

// ----- Mouse Event Handler -----
function handleMouseDown(e) {
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    draggingImage = hitImage(startX, startY);
}

function handleMouseUp(e) {
    draggingImage = null;
}

function handleMouseOut(e) {
    handleMouseUp(e);
}

function handleMouseMove(e) {

    if (draggingImage) {

        var mouseX = parseInt(e.clientX - offsetX);
        var mouseY = parseInt(e.clientY - offsetY);

        // clear original shape
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        draggingImage.imageX += dx;
        draggingImage.imageY += dy;
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;

        // redraw the images
        drawDivision();
        for (var i = 0; i < draggableImageArray.length; i++) {
            var dg = draggableImageArray[i];
            draw(dg);
        }
        draw(draggingImage);
    }

}

// ----- Register Mouse Event Handlers -----
$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});

// Draw division
drawDivision();

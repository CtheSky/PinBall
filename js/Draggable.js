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
var selectedImage = null;

// Dragging resizer related vars
var pi2 = Math.PI * 2;
var resizerRadius = 8;
var rr = resizerRadius * resizerRadius;
var draggingResizer = {
    x: 0,
    y: 0
};

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
Draggable.prototype.imageLeft = function(){ return this.imageX; };
Draggable.prototype.imageRight = function(){ return this.imageX + this.imageWidth; };
Draggable.prototype.imageTop = function(){ return this.imageY; };
Draggable.prototype.imageBottom = function(){ return this.imageY + this.imageHeight; };

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

// Draw four drag anchors for image
function drawDragAnchors(dg){
    drawDragAnchor(dg.imageLeft(), dg.imageTop());
    drawDragAnchor(dg.imageRight(), dg.imageTop());
    drawDragAnchor(dg.imageRight(), dg.imageBottom());
    drawDragAnchor(dg.imageLeft(), dg.imageBottom());
}

// Draw a single drag anchor
function drawDragAnchor(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, resizerRadius, 0, pi2, false);
    ctx.closePath();
    ctx.fill();
}

// Redraw all draggable instances and division line
function redrawDraggables(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDivision();
    for (var i = 0; i < draggableImageArray.length; i++) {
        var dg = draggableImageArray[i];
        draw(dg);
    }
    if (draggingImage) {
        draw(draggingImage);
        drawDragAnchors(draggingImage);
    }
    if (selectedImage) {
        draw(selectedImage);
        drawDragAnchors(selectedImage);
    }
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

// Find clicked resize anchor
function anchorHitTest(x, y) {
    if (selectedImage) {
        console.log(x, "  ", y);
        var dx, dy;
        // top-left
        dx = x - selectedImage.imageLeft();
        dy = y - selectedImage.imageTop();
        if (dx * dx + dy * dy <= rr) {
            return 0;
        }
        // top-right
        dx = x - selectedImage.imageRight();
        dy = y - selectedImage.imageTop();
        if (dx * dx + dy * dy <= rr) {
            return 1;
        }
        // bottom-right
        dx = x - selectedImage.imageRight();
        dy = y - selectedImage.imageBottom();
        if (dx * dx + dy * dy <= rr) {
            return 2;
        }
        // bottom-left
        dx = x - selectedImage.imageLeft();
        dy = y - selectedImage.imageBottom();
        if (dx * dx + dy * dy <= rr) {
            return 3;
        }
    }
    return -1;
}

// ----- Mouse Event Handler -----
function handleMouseDown(e) {
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    var clickedImage = hitImage(startX, startY);
    draggingResizer = anchorHitTest(startX, startY);
    if (draggingResizer != -1)
        console.log(draggingResizer);
    if (draggingResizer < 0 && clickedImage != draggingImage) {
        draggingImage = clickedImage;
        selectedImage = clickedImage;
        redrawDraggables();
    }
}

function handleMouseUp(e) {
    draggingImage = null;
    draggingResizer = -1;
}

function handleMouseOut(e) {
    handleMouseUp(e);
}

function handleMouseMove(e) {
    var mouseX = parseInt(e.clientX - offsetX);
    var mouseY = parseInt(e.clientY - offsetY);

    if (draggingResizer > -1) {
        // resize the image
        var imageRight = selectedImage.imageRight();
        var imageBottom = selectedImage.imageBottom();
        switch (draggingResizer) {
            case 0:
                //top-left
                selectedImage.imageX = mouseX;
                selectedImage.imageWidth = imageRight - mouseX;
                selectedImage.imageY = mouseY;
                selectedImage.imageHeight = imageBottom - mouseY;
                break;
            case 1:
                //top-right
                selectedImage.imageY = mouseY;
                selectedImage.imageWidth = mouseX - selectedImage.imageX;
                selectedImage.imageHeight = imageBottom - mouseY;
                break;
            case 2:
                //bottom-right
                selectedImage.imageWidth = mouseX - selectedImage.imageX;
                selectedImage.imageHeight = mouseY - selectedImage.imageY;
                break;
            case 3:
                //bottom-left
                selectedImage.imageX = mouseX;
                selectedImage.imageWidth = imageRight - mouseX;
                selectedImage.imageHeight = mouseY - selectedImage.imageY;
                break;
        }

        if(selectedImage.imageWidth < 16) { selectedImage.imageWidth = 16;}
        if(selectedImage.imageHeight < 16) { selectedImage.imageHeight = 16;}

        // redraw the images
        redrawDraggables();

    } else if (draggingImage) {
        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        draggingImage.imageX += dx;
        draggingImage.imageY += dy;
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;

        // redraw the images
        redrawDraggables();
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

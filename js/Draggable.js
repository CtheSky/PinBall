/**
 * Created by CtheSky on 2016/11/9.
 */

// Get canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set canvas width and height
function viewport()
{
    var e = window
        , a = 'inner';
    if ( !( 'innerWidth' in window ) )
    {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
canvas.width = viewport().width - 40;
canvas.height = viewport().height - 40;

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
var resizerRadius = 8;
var rr = resizerRadius * resizerRadius;
var draggingResizer = {
    x: 0,
    y: 0
};
var anchorImages = [new Image(), new Image(), new Image(), new Image()];
anchorImages[0].src = 'img/anchorLT.png';
anchorImages[1].src = 'img/anchorRT.png';
anchorImages[2].src = 'img/anchorLB.png';
anchorImages[3].src = 'img/anchorRB.png';

// translate from degree rto radian
var TO_RADIANS = Math.PI / 180;

// Floating panel
var $panel = $('#panel');
var $keyBindPanel = $('#key_bind_panel');

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
    this.imageDegree = 0;

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


// -------------- draw functions --------------
// Draw draggableImage
function draw(dg){
    var image = dg.image;

    ctx.save();
    ctx.translate(dg.imageX, dg.imageY);
    ctx.translate(dg.imageWidth / 2, dg.imageHeight / 2);
    ctx.rotate(dg.imageDegree * TO_RADIANS);
    ctx.drawImage(image, 0, 0, image.width, image.height,
        -(dg.imageWidth / 2), -(dg.imageHeight / 2), dg.imageWidth, dg.imageHeight);
    ctx.restore();
}

// Draw four drag anchors for image
function drawDragAnchors(dg){
    drawDragAnchor(dg.imageLeft(), dg.imageTop(), 0);
    drawDragAnchor(dg.imageRight(), dg.imageTop(), 1);
    drawDragAnchor(dg.imageLeft(), dg.imageBottom(), 2);
    drawDragAnchor(dg.imageRight(), dg.imageBottom(), 3);
}

// Draw a single drag anchor
function drawDragAnchor(x, y, index) {
    ctx.drawImage(anchorImages[index], x - 8, y - 8);
}

// Redraw all draggable instances and division line
function redrawDraggables(){
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

// Draw floating panel
function redrawFloatingPanel(){
    if (selectedImage){
        if (selectedImage.constructor == LeftFlip || selectedImage.constructor == RightFlip)
            $keyBindPanel.show();
        else
            $keyBindPanel.hide();
        $panel.show();
        $panel.css('left', offsetX + selectedImage.imageX + selectedImage.imageWidth + 10);
        $panel.css('top', offsetY + selectedImage.imageY);

    } else {
        $panel.hide();
    }

}

// clean canvas
function clean(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// redraw canvas
function flushCanvas(){
    clean();
    redrawDraggables();
    redrawFloatingPanel();
}

// ----------- hit detect functions ------------
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
    if (draggingResizer < 0 && clickedImage != draggingImage) {
        draggingImage = clickedImage;
        selectedImage = clickedImage;
        flushCanvas();
        flushPanel();
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

        // redraw canvas
        flushCanvas();
    } else if (draggingImage) {
        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        draggingImage.imageX += dx;
        draggingImage.imageY += dy;
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;

        // redraw canvas
        flushCanvas();
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

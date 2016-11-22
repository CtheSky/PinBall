/**
 * Created by CtheSky on 2016/11/22.
 */

// Get generator panel
var $generator = $('#generator');

// Set position to top-right corner of canvas
var topOffset = canvasOffset.top;
var leftOffset = canvasOffset.left + canvas.width - $generator.width();
$generator.css('top',topOffset);
$generator.css('left',leftOffset);

// Set position for imageProp
var imageProp = {
    imageSrc: null,
    imageX: canvas.width - $generator.width(),
    imageY: $generator.height() + 20,
    imageWidth: 50,
    imageHeight: 50
};

$('#generate').click(function(){
    var blockType = $('#input-block-type').val();
    console.log(blockType);
    switch (blockType) {
        case 'Static Rectangle':
            imageProp.imageSrc = 'img/staticSquare.png';
            draggableImageArray.push(new StaticSquare(imageProp));
            break;
        case 'Static Circle':
            imageProp.imageSrc = 'img/staticCircle.png';
            draggableImageArray.push(new StaticCircle(imageProp));
            break;
        case 'Static Triangle':
            imageProp.imageSrc = 'img/staticTriangle.png';
            draggableImageArray.push(new StaticTriangle(imageProp));
            break;
        case 'Dynamic Rectangle':
            imageProp.imageSrc = 'img/dynamicSquare.png';
            draggableImageArray.push(new DynamicSquare(imageProp));
            break;
        case 'Dynamic Circle':
            imageProp.imageSrc = 'img/dynamicCircle.png';
            draggableImageArray.push(new DynamicCircle(imageProp));
            break;
        case 'Dynamic Triangle':
            imageProp.imageSrc = 'img/dynamicTriangle.png';
            draggableImageArray.push(new DynamicTriangle(imageProp));
            break;
        case 'Left Flip':
            imageProp.imageSrc = 'img/leftFlip.png';
            draggableImageArray.push(new LeftFlip(imageProp));
            break;
        case 'Right Flip':
            imageProp.imageSrc = 'img/rightFlip.png';
            draggableImageArray.push(new RightFlip(imageProp));
            break;
    }
    flushCanvas();
});

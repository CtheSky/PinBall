/**
 * Created by CtheSky on 2016/11/22.
 */

// Show Info Handler
var infoPanelVisible = false;
$('#info').click(function(){
    if (infoPanelVisible){
        $('#info_panel').hide(200);
        infoPanelVisible = false;
    } else {
        $('#info_panel').show(200);
        infoPanelVisible = true;
    }
});

// Opacity Input Handler
$('#input-opacity').on('change',function(){
    var opacity =  $(this).val() / 100.0;
    if (opacity < 0 || opacity > 1){
        opacity = 1;
        alert('Opacity should between 0 and 100!');
    }
    $('#panel').css('opacity', $('#input-opacity').val() / 100.0);
});

// Density Input Handler
$('#input-density').on('change',function(){
    var density =  $(this).val() / 10.0;
    if (density <= 0 ){
        $(this).val(10);
        alert('Density should be greater than 0!');
    } else {
        selectedImage.b2FixtureDef.density = density;
    }
});

// Friction Input Handler
$('#input-friction').on('change',function(){
    var friction =  $(this).val() / 10.0;
    if (friction < 0 || friction > 1){
        $(this).val(0);
        alert('Density should be between 0 and 10!');
    } else {
        selectedImage.b2FixtureDef.friction = friction;
    }
})

// ----- Rotate Event Handler -----
var timeout, timeInterval = 20;
$('#cw').on('mousedown', function(){
    var rotateAndDraw = function(){
        selectedImage.imageDegree = (selectedImage.imageDegree + 1) % 360;
        flushCanvas();
        timeout = setTimeout(rotateAndDraw, timeInterval);
    };
    timeout = setTimeout(rotateAndDraw, timeInterval);
}).on('mouseup mouseleave', function() {
    clearTimeout(timeout);
});

$('#ccw').on('mousedown', function(){
    var rotateAndDraw = function(){
        selectedImage.imageDegree = (selectedImage.imageDegree - 1) % 360;
        flushCanvas();
        timeout = setTimeout(rotateAndDraw, timeInterval);
    };
    timeout = setTimeout(rotateAndDraw, timeInterval);
}).on('mouseup mouseleave', function() {
    clearTimeout(timeout);
});

// Delete Event Handler
$('#delete').click(function(){
    var index = draggableImageArray.indexOf(selectedImage);
    draggableImageArray.splice(index, 1);
    selectedImage = null;
    flushCanvas();
});

// Key bind Event Handler
$('#bind').click(function(){
    var $inputKey = $('#input_key');
    var key = $inputKey.val();
    if (key.match(/^[0-9a-z]+$/)) {
        selectedImage.keyBind = key;
    } else {
        alert('Key binding should be AlphaNumeric!');
    }
    $inputKey.val('');
    $inputKey.attr('placeholder', 'Current binding: ' + selectedImage.keyBind);
});

// Flush panel input value when selectedImage changes
function flushPanel() {
    $('#input-density').val(selectedImage.b2FixtureDef.density * 10);
    $('#input-friction').val(selectedImage.b2FixtureDef.friction * 10);
}

// javascript file

//var myCanvas = document.getElementById('drawingCanvas');
//var context = myDrawingCanvas.getContext("2d");

var canvas = document.getElementById('drawingCanvas');
var context = canvas.getContext('2d');
var drawingNow = false;

// var mouseX;
// var mouseY;


 var clickX = new Array();
 var clickY = new Array();
 var clickDrag = new Array();
 var pictureClicks = new Array();
// var paint;


// OTHER STUFF ON MOUSECLICKS

function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
 }

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
  }


canvas.addEventListener('mousedown', function(evt) {
  	   // alert("Hi evt is " + evt);
        var mousePos = getMousePos(canvas, evt);
        console.log(evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
        drawingNow = true;
        addClick(mousePos.x, mousePos.y, true);
        redraw();
 }, false);


canvas.addEventListener('mousemove', function(evt) {
  	   // alert("Hi evt is " + evt);
  	   if(drawingNow){
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
        addClick(mousePos.x, mousePos.y, true);
        redraw();
   		 }
 }, false);

      //  &&&&&&&&&&&&&&&&&&&&


 canvas.addEventListener('mouseup', function(evt) {
  	   // alert("Hi evt is " + evt);
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
        drawingNow = false;
        addClick(mousePos.x, mousePos.y, false);
        redraw();
 }, false);




function addClick(x, y, dragging){
	//alert("hello from addClick dragging is " + dragging);
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}


function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
	  for(var i=0; i < clickX.length; i++) {		
	    context.beginPath();
		    if(clickDrag[i] && i){
		      context.moveTo(clickX[i-1], clickY[i-1]);
		     }else{
		       context.moveTo(clickX[i]-1, clickY[i]);
		     }
	     context.lineTo(clickX[i], clickY[i]);
	     context.closePath();
	     context.stroke(); 
	  }

	  var pathIndex = 0;
	  while(pathIndex < clickX.length-1){
	  	if(clickDrag[i] == "down"){
	  		context.beginPath();
	  		while(clickDrag[i] != "up"){
	  			
	  		}

	  	}

       pathIndex++;
	  }
}


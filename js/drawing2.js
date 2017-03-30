// New Drawing Javascript

var canvas = document.getElementById('drawingCanvas');
var context = canvas.getContext('2d');
var drawingNow = false;


var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function addClick(x, y, dragging){
	//alert("hello from addClick dragging is " + dragging);
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}


//Handle the mouseEvents
canvas.addEventListener('mousedown', function(evt) {
 
 		console.log(evt);
 		drawingNow = true;
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse Down position: ' + mousePos.x + ',' + mousePos.y 
        +  " Drawing Now is " + drawingNow ;
       
        addClick(mousePos.x, mousePos.y, drawingNow);
        redraw();
        console.log(message);
 }, false);


canvas.addEventListener('mouseup', function(evt) {
 
 		console.log(evt);
 		drawingNow = false;
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse Up position: ' + mousePos.x + ',' + mousePos.y
        +  " Drawing Now is " + drawingNow ;
        addClick(mousePos.x, mousePos.y, drawingNow);
        redraw();
        console.log(message);
 }, false);


canvas.addEventListener('mousemove', function(evt) {

  	   console.log(evt);
  	   if(drawingNow){
	        var mousePos = getMousePos(canvas, evt);
	        var message = 'Mouse Up position: ' + mousePos.x + ',' + mousePos.y
	        +  " Drawing Now is " + drawingNow ;
	        drawingNow = true;
	        addClick(mousePos.x, mousePos.y, drawingNow);
	        redraw();
	        console.log(message);
   		}
 }, false);


function redraw(){

	  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.beginPath();
    context.fillRect(0, 0, 850, 500);
    context.fillStyle = "white";
    context.fill();


  	context.strokeStyle = "#df4b26";
  	context.lineJoin = "round";
  	context.lineWidth = 5;

      var justEndedALine = false;
  	  for(var i=0; i < clickX.length; i++) {	
	  	   if(clickDrag[i]){	
				    context.beginPath();
					    if(clickDrag[i] && i && !justEndedALine){
					      context.moveTo(clickX[i-1], clickY[i-1]);
					      //justEndedALine = false;
					     }else{
					       context.moveTo(clickX[i]-1, clickY[i]);
					       justEndedALine = false;
					     }
				     context.lineTo(clickX[i], clickY[i]);
				     context.closePath();
				     context.stroke(); 
		 	} else {
		 			justEndedALine = true;
		 	}
	  }

}

function exportDrawing(){
  exportCanvasAsPNG(canvas, "yourPic");
}



function exportCanvasAsPNG(id, fileName) {

    //var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/png";

    var imgURL = canvas.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

function clearCanvas() {

   drawingNow = false;
   clickX = new Array();
   clickY = new Array();
   clickDrag = new Array();
   redraw();

}






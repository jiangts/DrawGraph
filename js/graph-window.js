var mode;
function setMode(_mode){
	console.log('mode set to '+_mode);
	mode = _mode;
}

// default mode is create vertices
if(!mode){
	setMode('vertex');
}

var canvas = new fabric.Canvas('c', { selection: false }); 

var circleset = [];

//TODO fix a lot of retarded complications because of labeling clickability and stuff
canvas.on('mouse:down', function(options) {
  var circle = options.target;
	if(circle){
		if(mode == 'reposition'){
		circle.lockMovementX = circle.lockMovementY = false;
		}
		else{
		circle.lockMovementX = circle.lockMovementY = true;
		}
	}
  if(mode=='vertex' && !circle){
  	x=options.e.clientX; 
  	y=options.e.clientY;
	//OH SNAP
  	//x=Math.round(options.e.clientX/100)*100; 
  	//y=Math.round(options.e.clientY/100)*100;
	circle = makeCircle(x, y); 
	//vertices.push(circle);
  	canvas.add(circle);
  }
  if(mode == 'edge' || mode == 'deleteEdge'){
      //console.log(circle.type);
      function clickred(p){
      	p.stroke = 'red'; circleset.push(p);
      }
      if(circle && circle.isType('circle')){
        clickred(circle);
      }
      if(circle && circle.isType('text')){
        clickred(circle.owner);
      }
      if(!circle){
      	for(var i=0; i<circleset.length; i++){
      		circleset[i].stroke = 'black'
      		canvas.renderAll();
      	}; 
      	circleset = []; 
      }
      if(circleset.length == 2) {
      	a = circleset[0].left; b = circleset[0].top; c = circleset[1].left; d = circleset[1].top;
      	var line = makeLine([a, b, c, d])
      	var repeat = false;
	var indexrepeat;
	var indexrepeat2;
      	for(var i = 0; i<circleset[0].Edges.length; i++){
      		if(circleset[0].Edges[i].y == circleset[1]){var repeat = true; indexrepeat=i;}
      	}
      	for(var q = 0; q<circleset[1].Edges.length; q++){
      		if(circleset[1].Edges[q].y == circleset[0]){indexrepeat2=q};
      	}
      	if(!repeat && mode == 'edge'){
      		canvas.add(line);
      		line.sendToBack();
      		//add the line and the other vertex to vertex's edge set
      		circleset[0].Edges.push({x:line, y:circleset[1]});
      		circleset[1].Edges.push({x:line, y:circleset[0]});
      	}
	if(repeat && mode == 'deleteEdge'){
		canvas.remove(circleset[0].Edges[indexrepeat].x);
		//WARNING: delete only sets the Edge object to undefined. Could cause problems maybe
		circleset[0].Edges.remove(indexrepeat);
		circleset[1].Edges.remove(indexrepeat2);
	}
      	for(var i=0; i<circleset.length; i++){
      		circleset[i].stroke = 'black'
      		canvas.renderAll();
      	}; 
      	circleset = [];
      }
    }
  if(mode == 'delete'){
  	function removeSurroundingEdges(circle){
		for(var i = 0; i<circle.Edges.length; i++){
			canvas.remove(circle.Edges[i].x);
		}
	}
  	if(circle.isType('circle')){
		canvas.remove(circle);
		removeSurroundingEdges(circle);
	}
	if(circle.isType('text')){
		canvas.remove(circle);
		canvas.remove(circle.owner);
		removeSurroundingEdges(circle.owner);
	}
  }
  if(mode == 'deleteLabel'){
	if(circle && circle.isType('text')){
		canvas.remove(circle);
	}
  }
});
canvas.on('mouse:up', function(options){
  var circle = options.target;
  if(circle){
	circle.lockMovementX = circle.lockMovementY = true;
  }
  if(mode == 'label'){
	//in utils.js
	relabelingfn(circle);
  }
  if(mode == 'color'){
	//in utils.js
	coloringfn(circle);
  }
});
canvas.on('object:moving', function(e) {
  	var p = e.target;
	if(p.isType('circle')){
		if(p.textobj){
		p.textobj.set({'left': p.left, 'top': p.top});}
		//in utils.js
		movingfn(p);
	};
	if(p.isType('text')){
		p.owner.set({'left': p.left, 'top': p.top});
		//in utils.js
		movingfn(p.owner);
	}
});

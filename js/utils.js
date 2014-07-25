function isInteger(possibleInteger) {
    return /^[\d]+$/.test(possibleInteger);
}

function relabelingfn(_circle){
        var value; 
        if(_circle && _circle.isType('circle')){
                value = prompt("Enter Label","");
//                if(!isInteger(value) && value!=""){alert('not an integer!')};
        }         
//        if(isInteger(value)){
        var text = new fabric.Text(value, {
          fontSize: 20,//25,//3 digits, use font size 20
          left: _circle.left,
          top: _circle.top,
          originX: 'center',
          originY: 'center',
          fontFamily: 'Helvetica',
          fontWeight: 'bold',
          //selectable: false
        });
	text.hasControls = text.hasBorders = false;
	text.lockMovementX = text.lockMovementY = true;

        if(_circle.textobj){canvas.remove(_circle.textobj)};

        _circle.textobj = text;
        canvas.add(_circle.textobj);

        _circle.label = value;
	text.owner = _circle;
//        }
}
function coloringfn(_circle){
    if(_circle && _circle.isType('circle')){
        value = prompt("Enter Label","#f55");
        if(value == 'R'){
            //value = '#CC3300';
            value = '#FF7373';
        }else if(value == 'G'){
            value = '#52CC52';
        }else if(value == 'B'){
            value = '#6CB5FF';
        }
        _circle.fill = value;
    }         
}
function movingfn(p){
        for(var i = 0; i<p.Edges.length; i++){
                tmp = p.Edges[i];
                if(tmp.x.x1 == tmp.y.left && tmp.x.y1 == tmp.y.top){
                  tmp.x.set({ 'x2': p.left, 'y2': p.top });
                }
                else{
                  tmp.x.set({ 'x1': p.left, 'y1': p.top });
                }
                canvas.renderAll();
        }
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

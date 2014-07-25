// http://fabricjs.com/docs/fabric.Circle.html
// http://fabricjs.com/stickman/
function makeCircle(_x, _y, _id, _label, _rad) {
  if(!_rad)
  {_rad = 20;}
  var c = new fabric.Circle({
    left: _x - _rad/2,
    top: _y - _rad/2,
    strokeWidth: 3,
    radius: _rad,
    fill: '#fff',
    stroke: '#000'
  });
  c.hasControls = false;
  c.hasBorders = false;
  c.label = '';
  c.id = _id;
  c.Edges = [];
  c.textobj;

  return c;
}

function makeLine(coords) {
  return new fabric.Line(coords, {
    fill: '#000',
    stroke: '#000',
    strokeWidth: 3,
    selectable: false
  });
}

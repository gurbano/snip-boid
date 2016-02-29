
var _conf = {
	"type":"World",
	"debug":false,
	"bg" : [ //background 
		{
			layer: 'back',  //name of the layer
			order: 0,  //z-index (0 bottom )
			type: 'repeat', //array 
			data: {src: '/images/sky.jpg', size:512, repeat:true, position:{x:0, y:0}}
		}		
	],
	"entities":
		[
			{"type":"Bouncer", draggable:true, "id":"4e85a629-06f9-4789-97c6-eec5ba75b5cc","position":{"x":100,"y":100}},
			{"type":"Goal", draggable:true, "id":"4e85a629-06f9-4789-97c6-eec5ba75b5cd","position":{"x":500,"y":500}, "radius":20, "force": -1, "distance":1}
		]
};
module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	

/*

var targetFactory = conf.FLOCKFACTORY.targetFactory = conf.targetFactory = new PixiTargetFactory({});
var flock = new FlockFactory(conf.FLOCKFACTORY).generate(conf.FLOCK);



conf.WORLD = {};
conf.WORLD.entities = [flock];

var goal = new Goal({
	draggable: true,
	x: 100,
	y: 100,
	radius: 20,
	force: -1,
	distance: 1
});
targetFactory.apply(goal);	
conf.WORLD.entities.push(goal);

*/
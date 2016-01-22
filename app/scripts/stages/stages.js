var PAttractor = require('../pixi/PAttractor');
var FlockFactory = require('../boids/FlockFactory')({});
var conf = require('../configurations/experiment1');


module.exports = {
	'LOADING' : {
		name: 'LOADING',
		description: 'Loading screen',
		next: 'EXP1'
	},
	'EXP1' : {
		name: 'EXP1',
		description: 'Boids and a bunch of obstacles',
		next: 'EXP2',
		populateWorld : function (stage) {
			//Add a new mouse bouncer - left click attract, right click push
			addMouseBouncer.bind(this)(stage, {radius:30, force: 100, distance:300} )
			//add random bouncers
			addBouncers.bind(this)(stage, { force: -100, distance:60}, 100);
			//add the flock
			var flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					SIZE: 100,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false //generate boids at random position
				}),
				function(_flock){
					stage.addFlock(_flock);
				}
			);
			//5 dat.gui
			var gui = new dat.GUI();				
			var f1 = gui.addFolder('Distances');
			f1.add(flock, 'sepD',10,1000);
			f1.add(flock, 'cohD',10,1000);
			f1.add(flock, 'aliD',10,1000);
			var f2 = gui.addFolder('Forces');
			f2.add(flock, 'sepW',1,100);
			f2.add(flock, 'cohW',1,100);
			f2.add(flock, 'aliW',1,100);

		}
	},
	'EXP2' : {
		name: 'EXP2',
		description: 'Boids and a bunch of obstacles',
		next: 'EXP1',
		populateWorld : function (stage) {
			//add the flock
			var flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					SIZE: 100,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: true //generate boids at random position
				}),
				function(_flock){
					stage.addFlock(_flock);
				}
			);
			//5 dat.gui
			var gui = new dat.GUI();				
			var f1 = gui.addFolder('Distances');
			f1.add(flock, 'sepD',10,1000);
			f1.add(flock, 'cohD',10,1000);
			f1.add(flock, 'aliD',10,1000);
			var f2 = gui.addFolder('Forces');
			f2.add(flock, 'sepW',1,100);
			f2.add(flock, 'cohW',1,100);
			f2.add(flock, 'aliW',1,100);

		}
	},
	'GEN1': {
		name: 'GEN1',
		description: 'Boids and a bunch of obstacles',
		next: '',
		populateWorld : function (stage) {
			//add the flock
			var flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					SIZE: 0,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false //generate boids at random position
				}),
				function(_flock){
					stage.addFlock(_flock);
				}
			);

			//var generator = new BoidGenerator({});
			/*
			stage.addEntity(generator, function(obj){

			});
*/

			//5 dat.gui
			var gui = new dat.GUI();				
			var f1 = gui.addFolder('Distances');
			f1.add(flock, 'sepD',10,1000);
			f1.add(flock, 'cohD',10,1000);
			f1.add(flock, 'aliD',10,1000);
			var f2 = gui.addFolder('Forces');
			f2.add(flock, 'sepW',1,100);
			f2.add(flock, 'cohW',1,100);
			f2.add(flock, 'aliW',1,100);

		}
	}


}




/*UTILS*/

var pad = 10;
var addBouncers = function(stage, options, number, cb){
	for (var i = 0; i < number; i++) {
		var rx = gu.random(pad, this.width - pad);
		var ry = gu.random(pad, this.height - pad);
			
		stage.addEntity(
			new PAttractor($.extend(options,{radius:gu.random(1,10), x: rx, y:ry}) ), 
			function (obj) {
				obj.update = function () {
					if (cb)cb();
				}
			}
		);					
	};	
};
var addMouseBouncer = function (stage, options) {
	stage.addEntity(
		new PAttractor(options), 
			function (obj) {
				obj.update = function () {
					obj.position.x = document.pageX;
					obj.position.y = document.pageY;
					if (!document.mousedown){
							obj.force = 0;
						}else{
							obj.force = options.force;
						}
					}
		});	
}


/*
		var walls = [];
		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: pad },end: {x: 5*pad,y: this.height - pad }, force: 200, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
		
		walls.push(stage.addEntity(
					new PWall({start: {x: this.width - pad, y: pad },end: {x: this.width - pad, y: this.height -pad }, force: 100, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));



		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: pad },end: {x: this.width - pad, y: pad }, force: 200, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: this.height - pad },end: {x: this.width - pad, y: this.height - pad }, force: 100, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
*/
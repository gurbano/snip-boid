var StageFactory = require('./StageFactory')();
var FlockFactory = require('../boids/FlockFactory');
var conf = require('../configurations/experiment1');
var IMPL1 = require('../boids/impl/B1.js')();
var IMPL2 = require('../boids/impl/B2.js')();
var IMPL3 = require('../boids/impl/B3.js')();
var PGoal = require('../pixi/PGoal');
var PWall = require('../pixi/PWall');


var addRandomWalls = function(stage, options, number, cb){
	var pad = 50;
	for (var i = 0; i < number; i++) {
		var rx = gu.random(pad, this.width - pad);
		var ry = gu.random(pad, this.height - pad);
		var _rx = rx + gu.random(-pad*5 , pad*5 );
		var _ry = ry + gu.random(-pad*5 , pad*5 );
		
		var opts = {start: {x: rx,y: ry },end: {x:  _rx, y: _ry }, force: 200, distance:100}
		stage.addEntity(
			new PWall(opts), 
			function (obj) {});					
	};	
};
var mouseBouncerOptions = {radius:30, //mousebouncer config
					force_zero: 0, 
					force: -1000, 
					distance: 3000};

module.exports = {
	'LOADING' : {
		name: 'LOADING',
		description: 'Loading screen',
		next: 'EXP1'
	},
	'CITY1' : {
		name: 'CITY1',
		description: 'First City',
		populateWorld: function(stage){
			var self = this;
			//StageFactory.getWalls(this.width, this.height, 10).forEach(
			//	function (wall) {stage.addEntity(wall, function (obj) {});}); //create walls
			StageFactory.addBouncers(stage, this.width, this.height, { force: 100, distance:20}, 50);
			StageFactory.addMouseBouncer(stage,mouseBouncerOptions); //add mouse bouncer
			//stage.addEntity(new PGoal($.extend({},{distance: 10000, force:-1, radius:10, x: self.width, y: 400}) ), function (obj) {});
			//Generate the flock
			addRandomWalls.bind(this)(stage,{}, 30);

			var pad = 300;
			//StageFactory.addWall(stage, {x:0, y:pad}, {x:self.width, y:pad} );
			pad = 500;
			//StageFactory.addWall(stage, {x:0, y:pad}, {x:self.width, y:pad} );
			pad = 700;
			//StageFactory.addWall(stage, {x:0, y:pad}, {x:self.width, y:pad} );			
			
			var flock = FlockFactory({}).generate(
				$.extend(conf.FLOCK,{
					
					SIZE: 0,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false, //generate boids at random position
					IMPL: IMPL3,
					boids :{
						render: function  () {
							this.beginFill(gu.color());							
							this.moveTo(0,0);    
							this.lineTo(-10, 15);
					        this.lineTo(10, 0);
					        this.lineTo(-10, -15);
					        this.endFill();
						}
					},
				}),
				function(_flock){
					stage.addFlock(_flock);					
					for (var i = 0; i < 1; i++) {
						//_flock.addBoid($.extend(conf.FLOCK,{px: 0, py: 400 -50 +i*10 , sx:10, sy:0}));	
						//_flock.addBoid($.extend(conf.FLOCK,{px: self.width, py: 600-i , sx:-10, sy:0}));
					};	
				}
			);
			StageFactory.addGenerator(stage, {	
				IMPL: IMPL3,
				x: 0,//gu.random(pad, this.width - pad),
				y: 400,//gu.random(pad, this.height - pad),
				N: function(){return 1;}, //how many boids are generated per click
				max: function(){return 50;},
				flock: function(){return flock;}, //target flock ,
				delay: function(){return 100 * gu.random(1,10);}
			}, this );

			var gui = StageFactory.getGUI(stage, flock);
		}
	}
}


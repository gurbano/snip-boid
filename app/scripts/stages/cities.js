var StageFactory = require('./StageFactory')();
var FlockFactory = require('../boids/FlockFactory');
var conf = require('../configurations/experiment1');
var IMPL1 = require('../boids/impl/B1.js')();
var IMPL2 = require('../boids/impl/B2.js')();

var mouseBouncerOptions = {radius:30, //mousebouncer config
					force_zero: 0, 
					force: -100, 
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
			StageFactory.getWalls(this.width, this.height, 10).forEach(
				function (wall) {stage.addEntity(wall, function (obj) {});}); //create walls
			StageFactory.addMouseBouncer(stage,mouseBouncerOptions); //add mouse bouncer
			//Generate the flock
			FlockFactory({}).generate(
				$.extend(conf.FLOCK,{
					SIZE: 100,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false, //generate boids at random position
					IMPL: IMPL2,
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
				}
			);

		}
	}
}
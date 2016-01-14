require('../app/scripts/utils.js'); //load utility class
var assert = require('assert');
var FlockFactory = require('../app/scripts/boids/FlockFactory');

describe('Array', function() {
  describe('#remove()', function () {
    it('should remove from value', function () {
    	assert.equal(1, [1,2,3].indexOf(2));
      	assert.equal(-1, [1,2,3].remove(2).indexOf(2));
    });
  });
});

describe('FlockFactory', function() {
  describe('#generate()', function () {
    it('should return an empty flock, 2000 * 2000', function () {
    	var flock = new FlockFactory({}).generate({});
     	assert(flock);
     	assert.equal(0, flock.list().length)
    });

  });
});
describe('Flock', function() {
  describe('#add() // #remove()', function () {
    it('adding and removing boids', function () {
    	var flock = new FlockFactory({}).generate({});
    	var boid = flock.addBoid({});
     	
     	assert.equal(1, flock.list().length);
     	assert.equal(1, flock.listAt(0,0).length);
     	assert.equal(0, flock.listAt(10,10).length);
     	
     	flock.removeBoid(boid);
     	assert.equal(0, flock.list().length);
     	assert.equal(0, flock.listAt(0,0).length);
     	assert.equal(0, flock.listAt(10,10).length);
    });
  });
  describe('#add() // #removeAt()', function () {
    it('adding and removing boids at given position', function () {
    	var flock = new FlockFactory({}).generate({});    	
    	flock.addBoid({px : 10, py: 10 });
     	assert.equal(1, flock.list().length);
     	assert.equal(0, flock.listAt(0,0).length);
     	assert.equal(1, flock.listAt(10,10).length);
    });
  });
});
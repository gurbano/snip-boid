var gu = require('../app/scripts/utils.js'); //load utility class
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

/*describe('FlockFactory', function() {
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
  */
  describe('#utils()', function () {
    it('line intersection', function () {
      var line1 = gu.getLineEquation({x:0,y:0},{x:10, y:0});
      var line2 = gu.getLineEquation({x:0,y:0},{x:0, y:10});
      assert(line1.isHorizontal);
      assert(line2.isVertical);
      var inter = gu.lineInterception(line1, line2);
      assert.equal(0,inter.x);
      assert.equal(0,inter.y);

      //console.info(line);
    });

  });

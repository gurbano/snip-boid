const EventEmitter = require('events');
const util = require('util');

function BlackBoard() {
  EventEmitter.call(this);
}
util.inherits(BlackBoard, EventEmitter);

const instance = new BlackBoard();
instance.on('started',function () {
	console.info('blackboard started');
})

module.exports = instance
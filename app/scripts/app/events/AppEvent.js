var AppEvent = function(opts){	
	if (!(this instanceof AppEvent)) return new AppEvent(opts);	
	var self = this;
	this.opts = opts || {};	
	this.type = this.opts.type || 'AppEvent';
	this.start = this.opts.start || 0;
	this.end = this.opts.start || 0;
	this.onTrigger = this.opts.onTrigger || function (ev, data) {
		console.info('event triggered',this, ev, data);	
	}
	this.onBind = function (app) {
		this.app = app;
		app.subscribe(this.type, this, this.onTrigger);
		console.info('Event binded to app', app);
	}
	return this;
}
module.exports = AppEvent;
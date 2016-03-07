const AppEvent = require('../../events/AppEvent');

var Controllable = function (target, opts) {
    var cameraMover = new AppEvent({
        start:0,
        end:-1,
        type: "keypress",
        onTrigger : function (data) {
            //console.info('event triggered',this, data);   
            //this.app.trigger('started')
            if (data){
                console.info(data)
            }
        }
    });
    this.update = function (argument) {
        //cameraMover.onTrigger({});
    }
}


module.exports = Controllable;
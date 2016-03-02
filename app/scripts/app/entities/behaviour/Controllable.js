const AppEvent = require('../../events/AppEvent');

var Controllable = function (target, opts) {
    var cameraMover = new AppEvent({
        start:0,
        end:-1,
        type: "update",
        onTrigger : function (data) {
            //console.info('event triggered',this, data);   
            //this.app.trigger('started')
            var tresh = 0.1;
            if (document.pageX <= ($(document).width() *  tresh)   ){
                target.moveBy(-10,0);   
            }
            if (document.pageX >= ($(document).width()* (1-tresh) )   ){
                target.moveBy(10,0);
            }
            if (document.pageY <= ($(document).height() *  tresh)   ){
                target.moveBy(0,-10);
            }
            if (document.pageY >= ($(document).height()* (1-tresh) )   ){
                target.moveBy(0,10);
            }
        }
    });
    this.update = function (argument) {
        cameraMover.onTrigger({});
    }
}


module.exports = Controllable;
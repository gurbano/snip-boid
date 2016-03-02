const AppEvent = require('../../events/AppEvent');

var CamMover = function (source, opts) {

    var cameraMover = new AppEvent({
        start:0,
        end:-1,
        type: "update",
        onTrigger : function (data) {
            if(source.world && source.world.stage){
                source.world.stage.lookAt(source.position.x, source.position.y);
            }
        }
    });
    this.update = function (data) {
        cameraMover.onTrigger(data);
    }
}


module.exports = CamMover;
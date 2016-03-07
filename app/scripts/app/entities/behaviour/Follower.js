const AppEvent = require('../../events/AppEvent');

var Follower = function (source, target, opts) {
    var ev = new AppEvent({
        start:0,
        end:-1,
        type: "update",
        onTrigger : function (data) {            
            if (source && source.getPosition && target && target.setPosition){
                //console.info(source,target);
                target.setPosition(source.getPosition().x, source.getPosition().y);
            }
        }
    });
    this.update = function (data) {
        ev.onTrigger(data);
    }
}


module.exports = Follower;
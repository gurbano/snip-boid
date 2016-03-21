const AppEvent = require('../../events/AppEvent');

var Controllable = function (target, opts) {
    var contr = new AppEvent({
            start:0,
            end:-1,
            type: "keypress",
            onTrigger : function (data) {
                if (data){
                    switch(parseInt(data)){
                        case document.K_A:
                        case document.K_LEFT:
                            target.moveBy(-10,0);  
                            break;
                        case document.K_D:
                        case document.K_RIGHT:
                            target.moveBy(10,0);  
                            break;
                        case document.K_W:
                        case document.K_UP:
                            target.moveBy(0,-10);  
                            break;
                        case document.K_S:
                        case document.K_DOWN:
                            target.moveBy(0,10);  
                            break;
                    }
                }
            }
    })
    window.app.register(contr);
    this.update = function (argument) {
        //contr.onTrigger({});
    }
}


module.exports = Controllable;


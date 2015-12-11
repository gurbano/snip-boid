module.exports = DGlue;


function DGlue(opts, callback){
  if (!(this instanceof DGlue)) return new DGlue(opts, callback);
  var self = this;

  var dancer = new Dancer();
  this.kick = dancer.createKick({
     onKick: function ( mag ) {
        opts.onKick(mag);
     },
     offKick: function ( mag ) {
       opts.offKick(mag); 
    }
  });

  // Let's turn this kick on right away
  this.kick.on();

  dancer.onceAt( 10, function() {
    // Let's set up some things once at 10 seconds
  }).between( 10, 60, function() {
    // After 10s, let's do something on every frame for the first minute
  }).after( 60, function() {
    // After 60s, let's get this real and map a frequency to an object's y position
    // Note that the instance of dancer is bound to "this"
    //object.y = this.getFrequency( 400 );
  }).onceAt( 120, function() {
    // After 120s, we'll turn the kick off as another object's y position is still being mapped from the previous "after" method
    kick.off();
  }).load( document.getElementsByTagName('audio')[0] ); // And finally, lets pass in our Audio element to load



  this.dancer = dancer;

  this.play = function (argument) {
    this.dancer.play();
  }
  


  return self;
}


  
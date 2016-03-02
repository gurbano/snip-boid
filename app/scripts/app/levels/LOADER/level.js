var conf = require('./level.config')({}, 'CONF'); //Configuration
conf = require('./level.world')(conf,'WORLD');
conf = require('./level.UI')(conf,'UI');
conf = require('./level.events')(conf,'EVENTS');



console.info(conf);
module.exports = conf;
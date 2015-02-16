/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/employee', require('./api/employee'));
  app.use('/api/documentation', require('./api/documentation'));
  app.use('/api/network', require('./api/network'));
  app.use('/api/rnbd', require('./api/rnbd'));
  app.use('/api/hr/', require('./api/hr'));
  
  //i changed here
  app.use('/api/hrm', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};

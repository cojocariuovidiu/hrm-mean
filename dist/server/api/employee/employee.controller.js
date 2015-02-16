'use strict';

var _ = require('lodash');
var Employee = require('./employee.model');
var Hr = require('../hr/hr.model');
var Documentation = require('../documentation/documentation.model');
var Rnbd = require('../rnbd/rnbd.model');
var Network = require('../network/network.model');
var objKey = require('object-keys');

// Get list of employees
exports.index = function(req, res) {
  Employee.find(function(err, employees) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, employees);
  });
};

exports.getalldata = function(req, res) {
  //Get list of employees alongwith all tabs fields
  Employee.find({}).sort('-created').populate('hr').exec(function(err, employees) {
    if (err) {
      return handleError(res, err);
    }
    //logic for Pending Status etc
    if (employees) {
      var responseArray = [];
      var total = employees.length;
      //hr find
      Hr.find(function(err, hrs) {
        if (err) {
          return handleError(res, err);
        }
        var hrs = JSON.parse(JSON.stringify(hrs));
        //docs find
        Documentation.find(function(err, documentations) {
          if (err) {
            return handleError(res, err);
          }
          var documentations = JSON.parse(JSON.stringify(documentations));
          //rnbd find
          Rnbd.find(function(err, rnbds) {
            if (err) {
              return handleError(res, err);
            }
            var rnbds = JSON.parse(JSON.stringify(rnbds));
            //network find
            Network.find(function(err, networks) {
              if (err) {
                return handleError(res, err);
              }
              var networks = JSON.parse(JSON.stringify(networks));

              for (var i = 0; i < total; i++) {
                responseArray.push({
                  '_id': employees[i]._id,
                  'id': employees[i].id,
                  'name': employees[i].name,
                  'hr': 1,
                  'documentation': 1,
                  'rnbd': 1,
                  'network': 1,
                });

                for (var j = 0; j < hrs.length; j++) {
                  if (hrs[j].employeeId.toString() == employees[i]._id.toString()) {
                    for (var key in hrs[j]) {
                      if (hrs[j][key] === false) {
                        responseArray[i].hr = 0;
                      }
                    }
                  }
                }

                for (var j = 0; j < documentations.length; j++) {
                  if (documentations[j].employeeId.toString() == employees[i]._id.toString()) {
                    for (var key in documentations[j]) {
                      if (documentations[j][key] === false) {
                        responseArray[i].documentation = 0;
                      }
                    }
                  }
                }

                for (var j = 0; j < rnbds.length; j++) {
                  if (rnbds[j].employeeId.toString() == employees[i]._id.toString()) {
                    for (var key in rnbds[j]) {
                      if (rnbds[j][key] === false) {
                        responseArray[i].rnbd = 0;
                      }
                    }
                  }
                }

                for (var j = 0; j < networks.length; j++) {
                  if (networks[j].employeeId.toString() == employees[i]._id.toString()) {
                    for (var key in networks[j]) {
                      if (networks[j][key] === false) {
                        responseArray[i].network = 0;
                      }
                    }
                  }
                }
              //console.log("All we get is: ", employees[i]._id, hrs, documentations, rnbds, networks);
              }
              res.json(responseArray);
            });
          });
        });
      });
    };
  });
};

// Get a single employee
exports.show = function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    if (err) {
      return handleError(res, err);
    }
    if (!employee) {
      return res.send(404);
    }
    return res.json(employee);
  });
};

// Creates a new employee in the DB or Update previous record.
exports.create = function(req, res) {
  if (!req.body.id) return res.json(404, {
    error: "id not found"
  });
  var inputObject = {};
  Employee.find({
    id: req.body.id
  }, function(err, employee) {
    if (err) {
      return handleError(res, err);
    }
    //if employeeId exist, then return its DB entries
    if (employee.length) {
      return res.json(200, employee[0]);
    }
    //if employeeId does not exist, means new user (DO CREATE)
    if (!employee.length) {
      Employee.create({
        name: req.body.name,
        id: req.body.id
      }, function(err, employee) {
        if (err) return handleError(res, err);
        inputObject.employeeId = employee._id;
        //create default hr model
        Hr.create(inputObject, function(err, hr) {
          if (err) return handleError(res, err);
          //create default documentation model
          Documentation.create(inputObject, function(err, documentation) {
            if (err) return handleError(res, err);
            //create default rnbd model
            Rnbd.create(inputObject, function(err, documentation) {
              if (err) return handleError(res, err);
              //create default network model
              Network.create(inputObject, function(err, documentation) {
                if (err) return handleError(res, err);
                return res.json(201, employee);
              });
            });
          });
        });
      });
    };
  });
};

// Updates an existing employee in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Employee.findById(req.params.id, function(err, employee) {
    if (err) {
      return handleError(res, err);
    }
    if (!employee) {
      return res.send(404);
    }
  });
};

// Deletes a employee from the DB.
exports.destroy = function(req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    if (err) {
      return handleError(res, err);
    }
    if (!employee) {
      return res.send(404);
    }
    employee.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
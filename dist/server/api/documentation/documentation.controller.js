'use strict';

var _ = require('lodash');
var Documentation = require('./documentation.model');

// Get list of documentations
exports.index = function(req, res) {
  Documentation.find(function(err, documentations) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, documentations);
  });
};

// Get a single documentation
exports.show = function(req, res) {
  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });
  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Documentation.findOne({
    employeeId: inputObject.employeeId
  }, function(err, documentation) {
    if (err) {
      return handleError(res, err);
    }
    if (!documentation) {
      return res.send(404);
    }
    return res.json(documentation);
  });
};

// Creates a new documentation in the DB.
exports.create = function(req, res) {
  Documentation.create(req.body, function(err, documentation) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, documentation);
  });
};

// Updates an existing documentation in the DB.
exports.update = function(req, res) {
  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });
  if (req.body._id) {
    delete req.body._id;
  }
  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Documentation.findOne({
    employeeId: inputObject.employeeId
  }, function(err, documentation) {
    if (err) {
      return handleError(res, err);
    }
    if (!documentation) {
      return res.send(404);
    }
    var updated = _.merge(documentation, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, documentation);
    });
  });
};

// Deletes a documentation from the DB.
exports.destroy = function(req, res) {
  Documentation.findById(req.params.id, function(err, documentation) {
    if (err) {
      return handleError(res, err);
    }
    if (!documentation) {
      return res.send(404);
    }
    documentation.remove(function(err) {
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
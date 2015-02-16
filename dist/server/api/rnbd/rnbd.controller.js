'use strict';

var _ = require('lodash');
var Rnbd = require('./rnbd.model');

// Get list of rnbds
exports.index = function(req, res) {
  Rnbd.find(function(err, rnbds) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, rnbds);
  });
};

// Get a single rnbd
exports.show = function(req, res) {
  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });
  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Rnbd.findOne({
    employeeId: inputObject.employeeId
  }, function(err, rnbd) {
    if (err) {
      return handleError(res, err);
    }
    if (!rnbd) {
      return res.send(404);
    }
    return res.json(rnbd);
  });
};

// Creates a new rnbd in the DB.
exports.create = function(req, res) {
  Rnbd.create(req.body, function(err, rnbd) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, rnbd);
  });
};

// Updates an existing rnbd in the DB.
exports.update = function(req, res) {
  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });
  if (req.body._id) {
    delete req.body._id;
  }
  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Rnbd.findOne({
    employeeId: inputObject.employeeId
  }, function(err, rnbd) {
    if (err) {
      return handleError(res, err);
    }
    if (!rnbd) {
      return res.send(404);
    }
    var updated = _.merge(rnbd, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, rnbd);
    });
  });
};

// Deletes a rnbd from the DB.
exports.destroy = function(req, res) {
  Rnbd.findById(req.params.id, function(err, rnbd) {
    if (err) {
      return handleError(res, err);
    }
    if (!rnbd) {
      return res.send(404);
    }
    rnbd.remove(function(err) {
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
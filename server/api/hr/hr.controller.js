'use strict';

var _ = require('lodash');
var Hr = require('./hr.model');

// Get list of hrs
exports.index = function(req, res) {
  Hr.find(function(err, hrs) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, hrs);
  });
};

// Get a single hr
exports.show = function(req, res) {
  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });
  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Hr.findOne({
    employeeId: inputObject.employeeId
  }, function(err, hr) {
    if (err) {
      return handleError(res, err);
    }
    if (!hr) {
      return res.send(404);
    }
    return res.json(hr);
  });
};

// Creates a new hr in the DB.
exports.create = function(req, res) {
  Hr.create(req.body, function(err, hr) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, hr);
  });
};

// Updates an existing hr in the DB.
exports.update = function(req, res) {

  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });
  if (req.body._id) {
    delete req.body._id;
  }
  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Hr.findOne({
    employeeId: inputObject.employeeId
  }, function(err, hr) {
    if (err) {
      return handleError(res, err);
    }
    if (!hr) {
      return res.send(404);
    }
    var updated = _.merge(hr, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, hr);
    });
  });
};

// Deletes a hr from the DB.
exports.destroy = function(req, res) {
  Hr.findById(req.params.id, function(err, hr) {
    if (err) {
      return handleError(res, err);
    }
    if (!hr) {
      return res.send(404);
    }
    hr.remove(function(err) {
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
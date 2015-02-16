'use strict';

var _ = require('lodash');
var Network = require('./network.model');

// Get list of networks
exports.index = function(req, res) {
  Network.find(function(err, networks) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, networks);
  });
};

// Get a single network
exports.show = function(req, res) {
  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });

  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Network.findOne({
    employeeId: inputObject.employeeId
  }, function(err, network) {
    if (err) {
      return handleError(res, err);
    }
    if (!network) {
      return res.send(404);
    }
    return res.json(network);
  });
};

// Creates a new network in the DB.
exports.create = function(req, res) {
  Network.create(req.body, function(err, network) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, network);
  });
};

// Updates an existing network in the DB.
exports.update = function(req, res) {
  if (!req.params.id) return res.json(404, {
    error: "id not found"
  });
  if (req.body._id) {
    delete req.body._id;
  }
  var inputObject = {};
  inputObject.employeeId = req.params.id;
  Network.findOne({
    employeeId: inputObject.employeeId
  }, function(err, network) {
    if (err) {
      return handleError(res, err);
    }
    if (!network) {
      return res.send(404);
    }
    var updated = _.merge(network, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, network);
    });
  });
};

// Deletes a network from the DB.
exports.destroy = function(req, res) {
  Network.findById(req.params.id, function(err, network) {
    if (err) {
      return handleError(res, err);
    }
    if (!network) {
      return res.send(404);
    }
    network.remove(function(err) {
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
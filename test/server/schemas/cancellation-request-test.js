'use strict';
var _ = require('lodash');
var assert = require('assert-diff');
var validator = require('server/schema-validator');

var defaultRequest = {
  address: 'rfaw1MJk5613LmHeAiuhUPZpD93KCMKgrH',
  orderSequence: 2,
  instructions: {
    sequence: 10
  }
};

function validationErrors(request) {
  return validator.validate(request, 'CancellationRequest').errors;
}

function isValid(request) {
  return validationErrors(request).length === 0;
}

suite('CancellationRequest Schema', function() {
  suite('valid cancellation request', function() {
    test('minimal with instructions', function() {
      assert.deepEqual(validationErrors(defaultRequest), validator.noError);
    });
  });

  suite('invalid cancellation request', function() {
    test('missing orderSequence', function() {
      assert(!isValid(_.omit(defaultRequest, 'orderSequence')));
    });
  });
});
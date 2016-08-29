'use strict'

module.exports = function (options) {
  var seneca = this
  
  var cmp = require('./component');

	seneca.add({role: 'service2', cmd: 'component'}, function(args, callback) {
		callback(null, cmp(args));
	});

	seneca.add({role: 'service2', cmd: 'action1'}, function(args, callback) {
		callback(null, {data: 'data'});
	});

	seneca.add({role: 'service2', cmd: 'action2'}, function(args, callback) {
		callback(null, {data: 'data'});
	});

  return {
    name: 'service2'
  }
}
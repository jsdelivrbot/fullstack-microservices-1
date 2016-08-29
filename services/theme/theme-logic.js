'use strict'

module.exports = function (options) {
  var seneca = this

	var cmp = require('./component');

	seneca.add({role: 'theme', cmd: 'component'}, function(args, callback) {
		callback(null, cmp(args));
	});

  return {
    name: 'theme'
  }
}
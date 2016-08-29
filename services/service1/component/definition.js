Polymer({
  is: ':role',
  ready: function () {
  	var cmp = this
  	//cmp.use(cmp.transport, 'always');
  	/*
		cmp.transport.add = function (pattern, fn) {
			cmp.add(pattern, fn);
		}
		cmp.transport.add({role: 'activity', cmd: 'entry'},function (args, cb) {
			console.log('activity:entry just triggered');
			cb(null);
		});
		*/	
  },
  transport: function (args, cb) {
  	console.log('args',args);
  	var cmp = this;
  	
		function customLookup(args, cb) {
			console.log('just testing we got here.');
    	
    	//let pattern = {role: args.role, cmd: args.cmd}
    	//console.log('this needs to run on every msg trigger')
			let response = {}
			cb(null, response);
		}  	
  	
		customLookup(args, function (err, response) {
			if (err) { return cb(err) }
			if (!response) { //no match!
				err = Error('no matching pattern')
				err.code = 404
				cb && cb(err)
				return
			}
			cb(null, response)
		})
	},
  action1: function () {
    var cmp = this
    cmp.act({role: 'service1', cmd: 'action1'}, function (err, result) {
      cmp.act({
        role: 'activity', 
        cmd: 'entry', 
        info: {service: 'Service 1', action: 'Action 1'},
        result: result
      }); 
    });    
  },
  action2: function () {
    var cmp = this
    cmp.act({role: 'service1', cmd: 'action2'}, function (err, result) {
      cmp.act({
        role: 'activity', 
        cmd: 'entry', 
        info: {service: 'Service 1', action: 'Action 2'},
        result: result
      });
    });
  }
});
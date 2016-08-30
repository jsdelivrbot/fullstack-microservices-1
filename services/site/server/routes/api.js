'use strict'

var Boom = require('boom')
var jsonic = require('jsonic')

module.exports = [
  {
    method: 'GET',
    path: '/api/mesh-web',
    handler: function (request, reply) {
      var pattern = {role: 'mesh', get: 'members'}

      request.seneca.act(pattern, function (err, data) {
        if (err) return reply(Boom.internal(err))
        var compIdMap = {}
        var comps = []
				//we just want messages that have components for client==web and aren't brought down with initial page load.
 				data.list.filter(function (ele){
						var obj = jsonic(ele.pin)
						var id = ele.instance
						if (obj.client === 'web' && obj.cmd === 'component' && !compIdMap[id]) { 
							compIdMap[id] = obj 
						}
						return (obj.client === 'web' && obj.cmd !== 'component')
				})
				.forEach(function (ele){
						console.log(ele.pin)
						var obj = jsonic(ele.pin)
						delete obj.client
						var id = ele.instance
						if (compIdMap[id]) { //this msg has a component
							comps.push([obj,compIdMap[id]]) 
						}
				})
        return reply(comps)
      })
    }
  },
//   {
//     method: 'GET',
//     path: '/api/mesh',
//     handler: function (request, reply) {
//       var pattern = {role: 'mesh', get: 'members'}
// 
//       request.seneca.act(pattern, function (err, data) {
//         if (err) return reply(Boom.internal(err))
//         return reply(data)
//       })
//     }
//   },  

	{
		method: 'GET',
		path: '/api/{role}/{cmd}',
		handler: function(req, reply) {
			req.seneca.act({role: req.params.role, cmd: req.params.cmd, client: 'web'}, function(err, res) {
				if (err) {
					reply(Boom.wrap(err, !isNaN(err.code) ? err.code : 400, err.message));
					return
				}
				reply(req.params.cmd === 'component' ? res.html : res);
			});
		}
	},  

	{
		method: 'GET',
		path: '/api/{role}/scaffold/{cmd}',
		handler: function(req, reply) {
			req.seneca.act({role: req.params.role, cmd: req.params.cmd, client: 'web-scaffold'}, function(err, res) {
				if (err) {
					reply(Boom.wrap(err, !isNaN(err.code) ? err.code : 400, err.message));
					return
				}
				reply(req.params.cmd === 'component' ? res.html : res);
			});
		},
    config: {
        cache: {
            expiresIn: 315360000
        }
    }
	}
	 
]

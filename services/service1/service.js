'use strict'

var opts = {
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:service1,cmd:component,client:web-scaffold', model: 'consume'},
      {pin: 'role:service1,cmd:action1,client:web', model: 'consume'},
      {pin: 'role:service1,cmd:action2,client:web', model: 'consume'}
    ]
  }
}

require('seneca')()
  .use('entity')
  .use('./service1-logic.js')
  .use('mesh', opts.mesh)
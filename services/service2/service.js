'use strict'

var opts = {
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:service2,cmd:component,client:web-scaffold', model: 'consume'},
      {pin: 'role:service2,cmd:action1,client:web', model: 'consume'},
      {pin: 'role:service2,cmd:action2,client:web', model: 'consume'}
    ]
  }
}

require('seneca')()
  .use('entity')
  .use('./service2-logic.js')
  .use('mesh', opts.mesh)
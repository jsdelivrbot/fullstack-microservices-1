'use strict'

var opts = {
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:activity,cmd:component,client:web', model: 'consume'},
      {pin: 'role:activity,cmd:entry,client:web', model: 'consume'} //this msg only here because client needs to know about it.
    ]
  }
}

require('seneca')()
  .use('entity')
  .use('./activity-logic.js')
  .use('mesh', opts.mesh)

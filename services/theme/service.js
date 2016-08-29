'use strict'

var opts = {
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:theme,cmd:component,client:web-scaffold', model: 'consume'}
    ]
  }
}

require('seneca')()
  .use('entity')
  .use('./theme-logic.js')
  .use('mesh', opts.mesh)
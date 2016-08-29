function transport(args, cb) {
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
}
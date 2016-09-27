"use strict"
let express = require('express')
let webpack = require('webpack')
let app = express()

let production = process.env.NODE_ENV === 'production'
if(production) {
  app.use(function (req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
      var newHost = req.headers.host.slice(4)
      return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl)
    }
    next()
  })
}
if(!production) {
  let config = require('./webpack.client.config')
  let compiler = webpack(config)

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }))
  app.use(require("webpack-hot-middleware")(compiler))

  var chokidar = require('chokidar')
  var watcher = chokidar.watch('./dist')

  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log("Clearing /dist/ module cache from server")
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]dist[\/\\]/.test(id)) delete require.cache[id]
      })
    })
  })
}

let defaultAssets = {
  main: {
    js: '/build/bundle.js',
    css: '/build/main.css'
  }
}

if(production) {
  global.assets = require(__dirname + '/public/build/webpack.assets.json')
} else {
  global.assets = defaultAssets
}

app.use(express.static('public', { maxAge: 86400000 }))

app.use(function(req, res, next) {
  require('./dist/server').default(req, res, next)
})

const PORT = 9000
app.listen(PORT, () => console.log('Listening on', PORT))

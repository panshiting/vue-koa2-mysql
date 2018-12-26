require('babel-polyfill')
require('babel-register')

if (String(process.env.NODE_ENV) === 'development') {
  require('./server/dev')
} else {
  require('./server/app')
}

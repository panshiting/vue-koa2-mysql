require('babel-polyfill')
require('babel-register')

console.log(process.env.NODE_ENV)
if (String(process.env.NODE_ENV) === 'development') {
  require('./server/dev')
} else {
  require('./server/app')
}

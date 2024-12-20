  'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')


module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: '"http://localhost:5000"',
  BASE_URL_2: '"http://localhost:3000"'
})
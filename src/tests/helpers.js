const request = require('supertest')
const app = require('../index')

const http =
  (endpoint, method = 'post') =>
  () =>
    request(app)[method](`/${endpoint}`)

module.exports = {
  http,
}

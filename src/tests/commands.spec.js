const request = require('supertest')
const app = require('../index')
const { DIRECTIONS_MAP } = require('../helpers')

describe('Test not sending any data', () => {
  test('Should break with 400 status', async () => {
    const { statusCode } = await request(app).post('/commands')
    expect(statusCode).toBe(400)
  })
})

describe('Test not sending x postion', () => {
  test('Should break with 400 status', async () => {
    const { statusCode } = await request(app)
      .post('/commands')
      .send({ commands: 'LL', y: 1, direction: 'EAST' })
    expect(statusCode).toBe(400)
  })
})

describe('Test not sending y postion', () => {
  test('Should break with 400 status', async () => {
    const { statusCode } = await request(app)
      .post('/commands')
      .send({ commands: 'RR', x: 1, direction: 'EAST' })
    expect(statusCode).toBe(400)
  })
})

describe('Test not sending direction', () => {
  test('Should break with 400 status', async () => {
    const { statusCode } = await request(app)
      .post('/commands')
      .send({ commands: 'RR', x: 1, x: 1 })
    expect(statusCode).toBe(400)
  })
})

describe('Test sending invalid commands', () => {
  test('Should break with 400 status', async () => {
    const { statusCode } = await request(app)
      .post('/commands')
      .send({ commands: 'LLKKQ', x: 1, y: 1, direction: 'EAST' })
    expect(statusCode).toBe(400)
  })
})

describe('Test if directions are correct', () => {
  test('direction should be WEST x = 1 y = 1', async () => {
    const { body } = await request(app)
      .post('/commands')
      .send({ commands: 'RR', x: 1, y: 1, direction: DIRECTIONS_MAP.EAST })
    const { x, y, direction } = body

    expect(x).toBe(1)
    expect(y).toBe(1)
    expect(direction).toBe(DIRECTIONS_MAP.WEST)
  })
})
